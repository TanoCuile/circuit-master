MasterApp.module('Circuit', function initializeConstructorModule(circuit, app, backbone, marionette, $, _){
    var CircuitController = Marionette.Controller.extend({
        initialize: function(options){
            app.vent.on('addComponent', this.addComponent.bind(this))
        },
        addComponent: function(e, ui){
            var offset = ui.offset;
            var type = ui.helper.data('element');
            var component = app.Circuit.Component.ComponentFactory({
                position: {
                    x: offset.left,
                    y: offset.top
                },
                typeName: type
            });
            app.canvasDriver.createComponent(component).render();
        }
    });

    this.controller = null;

    this.initializeController = function(options){
        if (!this.controller) {
            this.controller = new CircuitController(options);
        }
        return this.controller;
    }
});