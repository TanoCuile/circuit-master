MasterApp.module('Driver.svg', function (module, app, Backbone, Marionette, $, _) {
    module.ComponentView = module.ControlView.extend({
        modelListen: function(){
            this.model.on('change:position', this.move.bind(this));
            // Check setting sketch point for properly synchronize control point and line
            this.model.on('change:sketchPoint', this.move.bind(this));
            this.model.on('change:active', this.activeState.bind(this));

            this.model.on('destroy', this.destroy.bind(this));
        },
        chose: function(e){
            if (e.ctrlKey) {
                this.trigger('addSetToChosen', this.model.get('pinCollection').toArray());
            } else {
                this.trigger('choseSet', this.model.get('pinCollection').toArray());
            }
        },
        createRepresentation: function(){
            var pos = this.model.get('position');
            return module.canvas.image(this.model.get('image'), pos.x, pos.y);
        },
        decorate: function () {
            this.$el.attr({
                stroke: 'none'
            });
        },
        decorateActive: function(){
            this.$el.attr({
                stroke: '#eee'
            });
        }
    });
});