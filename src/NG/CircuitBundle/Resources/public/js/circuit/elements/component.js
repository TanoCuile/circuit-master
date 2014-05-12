MasterApp.module('Circuit.Component', function(module, app, Backbone, Marionette, $, _){
    module.ComponentController = Marionette.Controller.extends({
        initialize: function(options){
            if (!_.has(options, 'parameters') || !_.has(options, 'logic')) {
                console.error('Invalid options', options);
            }

            this.parameters = options.parameters;

            _.extends(this, options.logic);
        },

        getJSON: function(){

        }
    });
});