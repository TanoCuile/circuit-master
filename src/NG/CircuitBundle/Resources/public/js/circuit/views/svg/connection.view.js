MasterApp.module('Circuit.View', function initializeConnectionView(views, app, backbone, marionette, $, _){
    views.LineView = views.ControlView.extend({
        customInitialize: function(options) {
            if (!_.has(options, 'controller')) {
                console.error('Invalid options', options)
            }

            if (_.has(options, 'prevMoveCallback')) {
                this.setPrev(options.prevMoveCallback);
            }

            if (_.has(options, 'nextMoveCallback')) {
                this.setNext(options.nextMoveCallback);
            }
        },

        redraw: function(){
            this.$el.remove();
            this.render();
        },

        listenModel: function(){
            this.model.on('change:active', this.checkActive.bind(this));
        },

        checkActive: function (){
            if (this.model.get('active')) {
                this.$el.attr({
                    'stroke': '#669'
                });
            } else {
                this.$el.attr({
                    'stroke': '#333'
                });
            }
        },

        draw: function(){
            var startPos = this.model.get('start');
            var finishPos = this.model.get('finish');
            this.$el = views.driver.canvas.
                line(startPos.get('x'), startPos.get('y'), finishPos.get('x'), finishPos.get('y'));
            this.$el.attr({
                'stroke-width': 1
            });
            this.checkActive();
            views.driver.connections.add(this.$el);
            this.listenElement();
            // TODO: Explore deleting actions from context menu
            $(this.$el.node).contextmenu({ width: 150, items:[
                { text: "Видалити", icon: 'none', app: app, action: this.remove }
            ]});
            console.log('cMenu');
        },

        remove: function(element, opts){
            var app = this.data.app;
            console.log(element);
            console.log(opts);

            app.controller.find();
        },

        setPrev: function(prevLine){
            this.prevLine = prevLine;
            return this;
        },
        setNext: function(nextLine){
            this.nextLine = nextLine;
            return this;
        },
        getPrev: function (){
            return this.prevLine;
        },
        getNext: function(){
            return this.nextLine;
        },


        movePoint: function (position, root) {
            var axis = this.model.get('axis');
            var oppositeAxis = this.controller.getOppositeAxis(this.model);
            var elementPosition = {};
            // move start or finish on current axis
            var point = 'start';
            if (root == '2') {
                point = 'finish';
            }
            if (position[axis]) {
                elementPosition[axis + root] = position[axis];
                this.model.get(point).set(axis, position[axis]);
            }
            // move together start and finish if moving turn by opposite axis
            if (position[oppositeAxis]) {
                this.model.get(point).set(oppositeAxis, position[oppositeAxis]);
                elementPosition[oppositeAxis + '1'] = position[oppositeAxis];
                elementPosition[oppositeAxis + '2'] = position[oppositeAxis];
            }
            this.$el.attr(elementPosition);
            // move relative lines by opposite axis
            if (position[oppositeAxis] > 0) {
                var moveBy = {};
                moveBy[axis] = 0;
                moveBy[oppositeAxis] = position[oppositeAxis];
                if (this.getPrev()) {
                    this.getPrev().moveFinish(moveBy);
                }
                if (this.getNext()) {
                    this.getNext().moveStart(moveBy);
                }
            }
        },
        // moving callbacks
        moveStart: function(position) {
            this.movePoint(position, '1');
        },
        moveFinish: function(position) {
            this.movePoint(position, '2');
        },
        // getters fot moving callbacks
        getMoveStart: function() {
            return this.moveStart.bind(this);
        },
        getMoveFinish: function() {
            return this.moveFinish.bind(this);
        },
        //
        getStart: function(){
            return this.model.get('start');
        },
        getFinish: function(){
            return this.model.get('finish');
        },

        drag: function(dx, dy, e){
            if (this.defPosition){
                var d = {
                    'x': this.defPosition.x + dx,
                    'y': this.defPosition.y + dy
                };
                var axis = this.model.get('axis');
                d[axis] = 0;
                this.movePoint(d, '1');
            }
        },
        dragStart: function(e){
            if (this.model.get('start').get('f') < 2 && this.model.get('finish').get('f') < 2){
                this.model.set('inAction', true);

                this.defPosition = this.model.get('start').toJSON();
                this.curPos = this.defPosition;
            } else {
                this.defPosition = 0;
            }
        },
        dragFinish: function(x){
            this.model.set('inAction', false);

            this.model.set('position', this.curPos);
        },
        onMouseOver: function () {
            this.controller.activate();
        },
        onMouseOut: function () {
            this.controller.unActivate();
        },
        onDbClick: function(e){
            //this.controller.ShowPreview();
            var globalStart = $(e.target).position();
            var relX = e.offsetX;
            var relY = e.offsetY;

            this.controller.divideLine(relX, relY, this.model, this);
        },

        destroy: function() {
            this.$el.remove();
            if (this.prevLine) {
                delete this.prevLine;
            }
            if (this.nextLine) {
                this.nextLine.destroy();
            } else {
                delete this;
            }
        }
    });
});