MasterApp.module('Driver.svg', function (module, app, Backbone, Marionette, $, _) {
    var SVGDriver = {
        initialize: function (options) {
            this.canvas = new Snap(options.canvas[0]);
            this.backgorundGroup = this.canvas.group();
            this.connectionsGroup = this.canvas.group();
            this.componentGroup = this.canvas.group();
            this.controlGroup = this.canvas.group();
        }
    };
    var CircuitView = Backbone.View.extend({
        offset: null,
        initialize:function(){
            this.offset = this.$el.offset();
            this.$el.droppable({
                drop: this.onDrop.bind(this)
            });
        },
        onDrop: function(e, ui){
            app.vent.trigger('addComponent', e, ui);
        }
    });
    $(document).ready(function initCircuitView(){
        var circuit = $('.circuit-container');
        if (circuit.length > 0) {
            module.circuitView = new CircuitView({
                el: circuit[0]
            })
        }
    }.bind(this));

    _.extend(module, SVGDriver, app.Driver.requirements);
});