MasterApp.module('Circuit.Parameters', function(module, app, Backbone, Marionette, $, _){
    module.Parameter = Backbone.Model.extend({
        defaults: {
            value: 0,
            type: false,
            factor: 1
        },
        getValue: function(){
            return this.get('value') * this.get('factor');
        }
    });



    module.ParametersTypesCollection = Backbone.Collection.extend({

    });

    module.parametersTypes =
});