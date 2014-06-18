MasterApp.module('Circuit.View', function initializeElementaryView(circuit, app, backbone, marionette, $, _){
    circuit.ElementaryView = Backbone.View.extend({
        initialize: function(options){
            if (!_.has(options, 'controller') || !_.has(options, 'model')) {
                console.error('Invalid options', options);
            }

            this.controller = options.controller;

            this.customInitialize(options);

            this.listenModel();
        },
        listenElement: function(){},
        customInitialize: function(options){},
        listenModel: function(){}
    })
});