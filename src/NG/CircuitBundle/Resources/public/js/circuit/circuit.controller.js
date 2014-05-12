MasterApp.module('Circuit', function initializeConstructorModule(circuit, app, backbone, marionette, $, _){
    var CircuitController = Marionette.Controller.extend({
        initialize: function(options){

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