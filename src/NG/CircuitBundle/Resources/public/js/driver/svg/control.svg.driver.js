MasterApp.module('Driver.svg', function (module, app, Backbone, Marionette, $, _) {
    module.ControlView = module.ElementaryView.extend({
        listen: function(){
            this.$el
                .mouseover(this.onMouseOver.bind(this))
                .mouseout(this.onMouseOut.bind(this))
                .click(this.onClick.bind(this))
                .dblclick(this.onDbClick.bind(this))
                .drag(this.drag.bind(this),this.dragStart.bind(this), this.dragFinish.bind(this))
            ;
        },
        modelListen: function(){
            this.model.on('change:position', this.move.bind(this));

            // Check setting sketch point for properly synchronize control point and line
            this.model.on('change:sketchPoint', this.move.bind(this));
            this.model.on('change:active', this.activeState.bind(this));

            this.model.on('destroy', this.destroy.bind(this));
        },
        activeState: function(){
            if (!this.model.get('active')) {
                this.decorate()
            } else {
                this.decorateActive();
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
                this.trigger('addToChosen', this.model);
            } else {
                this.trigger('choseNew', this.model);
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
        onDbClick: function(){},
        drag: function(dx, dy, x, y){
            var def = this.model.get('def');
            this.model.set('position', {
                x: def.x + dx,
                y: def.y + dy
            });
        },
        dragStart: function(x, y){
            this.trigger('dragStart', this);
            this.model.set('def', this.model.get('position'));
            this.model.set('inAction', true);
        },
        dragFinish: function(x, y){
            this.model.set('inAction', false);
        }
    });

    module.PointView = module.ControlView.extend({
        radius: 0,
        move: function(){
            var pos = this.model.get('sketchPoint');
            if (!pos) {
                pos = this.model.get('position');
            }
            this.$el.attr({
                cx: pos.x,
                cy: pos.y
            });
            this.model.trigger('movedTo', pos);
        },
        createRepresentation: function(){
            var pos = this.model.get('position');
            return module.canvas.circle(pos.x, pos.y, this.radius);
        },
        decorate: function () {},
        decorateActive: function(){}
    });

    module.ControlPointView = module.PointView.extend({
        radius: 4,
        decorate: function () {
            this.$el.attr({
                fill: '#669',
                stroke: '#eee'
            });
        },
        decorateActive: function(){
            this.$el.attr({
                fill: '#99f',
                stroke: '#eee'
            });
        }
    });

    module.PinView = module.ControlPointView.extend({
        drag: function(dx, dy, x, y){
            this.movable.drag(dx, dy, x, y);
        },
        dragStart: function(x, y){
            this.trigger('dragStart', this);
            var position = this.model.get('position');
            this.movable = app.canvasDriver.createPoint(position.x, position.y, true);
            this.movable.render();
            this.movable.dragStart(x, y);
            this.connectionLine = app.canvasDriver.createLine(this.model, this.movable.model, true).render();
        },
        dragFinish: function(){
            var control = app.Driver.controlGrid.quickFind(this.movable.model.get('position'), this.model.get('id'));
            if (control) {
                this.connectionLine.model.set('finish', control);
                this.connectionLine.modelListen();
                control.trigger('moveTo', control.get('position'));
            } else {
                this.model.off('change:position', null, this.connectionLine.model.get('id'));
                this.model.off('movedTo', null, this.connectionLine.model.get('id'));
                this.movable.model.destroy();
                this.movable.model.off();
                this.movable.off();
                this.movable = null;
                this.connectionLine.model.off();
                this.connectionLine.off();
                this.connectionLine = null;
            }
        }
    });
});