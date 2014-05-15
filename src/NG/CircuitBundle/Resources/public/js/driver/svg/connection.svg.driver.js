MasterApp.module('Driver.svg', function (module, app, Backbone, Marionette, $, _) {
    module.ConnectionView = module.ElementaryView.extend({
        listen: function () {
            this.$el
                .mouseover(this.onMouseOver.bind(this))
                .mouseout(this.onMouseOut.bind(this))
                .click(this.onClick.bind(this))
                .dblclick(this.onDbClick.bind(this))
            ;
        },
        modelListen: function () {
            this.bind(this.model.get('start'), 'change:position', this.startSketchingListen.bind(this));
            this.bind(this.model.get('finish'), 'change:position', this.finishSketchingListen.bind(this));

            this.bind(this.model.get('start'), 'movedTo', this.startMove.bind(this));
            this.bind(this.model.get('finish'), 'movedTo', this.finishMove.bind(this));

            this.bind(this.model.get('finish'), 'destroy', this.destroy.bind(this));
        },
        startSketchingListen: function(){
            var pos = {};
            if (!(pos = this.sketching(this.model.get('start'), this.model.get('finish')))){
                pos = this.model.get('start').get('position');
            }
        },
        finishSketchingListen: function(){
            var pos = {};
            if (!(pos = this.sketching(this.model.get('finish'), this.model.get('start')))){
                pos = this.model.get('finish').get('position');
            }
        },
        startMove:function(pos){
            this.$el.attr({
                x1: pos.x,
                y1: pos.y
            });
        },
        finishMove:function(pos){
            this.$el.attr({
                x2: pos.x,
                y2: pos.y
            });
        },
        sketching: function (current, other) {
            var value = current.get('position');
            var base = other.get('position');
            if (Math.abs(value.x - base.x) < app.Driver.gridPrecision  &&  Math.abs(value.y - base.y) < app.Driver.gridPrecision) {
                current.set('sketchPoint', null);
                return false;
            }
            var setSketch = false;
            if (Math.abs(value.x - base.x) <= app.Driver.gridPrecision) {
                value.x = base.x;
                setSketch = true;
            }
            if (Math.abs(value.y - base.y) <= app.Driver.gridPrecision) {
                value.y = base.y;
                setSketch = true;
            }
            if (setSketch) {
                current.set('sketchPoint', value);
                return value;
            } else {
                current.set('sketchPoint', null);
                return false;
            }
        },
        activate: function(){
            this.model.set('active', true);
        },
        unActivate: function(){
            if (!this.model.get('chosen') && !this.model.get('inAction')) {
                this.model.set('active', false);
            }
        },
        chose: function(e){
            if (e.ctrlKey) {
                this.trigger('addSetToChosen', [this.model.get('start'), this.model.get('finish')]);
            } else {
                this.trigger('choseSet', [this.model.get('start'), this.model.get('finish')]);
            }
        },
        onMouseOver: function(){
            this.activate();
        },
        onMouseOut: function(){
            this.unActivate();
        },
        onClick: function(e){
            this.chose(e);
        },
        onDbClick: function(e){
            var globalStart = $(e.target).position();
            var relX = e.offsetX;
            var relY = e.offsetY;

            this.divideLine(relX, relY);
        },
        divideLine: function(x, y){
            var start = this.model.get('start');
            var finish = this.model.get('finish');

            var middlePoint = this.createPoint(x, y).render();

            this.createNewLine(middlePoint, finish).render();

            this.model.set('finish', middlePoint.model);

            finish.off('movedTo', null, this.model.get('id'));

            this.stopListening();
            this.modelListen();
        }
    });
    module.LineView = module.ConnectionView.extend({
        createRepresentation: function(){
            var startPos = this.model.get('start').get('position');
            var finishPos = this.model.get('finish').get('position');
            return module.canvas.line(startPos.x, startPos.y, finishPos.x, finishPos.y);
        },
        decorate: function () {
            this.$el.attr({
                stroke: '#000',
                'stroke-width': 3
            });
        },
        decorateActive: function(){
            this.$el.attr({
                stroke: '#113',
                'stroke-width': 3
            });
        },
        createPoint: function (x, y) {
            return module.createControlPoint(x, y);
        },
        createNewLine: function (middlePoint, finish) {
            return app.canvasDriver.createLine(middlePoint.model, finish);
        }
    });
});