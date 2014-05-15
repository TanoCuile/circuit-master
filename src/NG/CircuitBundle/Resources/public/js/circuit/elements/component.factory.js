MasterApp.module('Circuit.Component', function(module, app, Backbone, Marionette, $, _){
    var typeInfo = {};
    app.addInitializer(function(options){

    });
    module.ComponentFactory = function(parameters){
        // parameters contain: position( {x:0,y:0} ) typeName
        var component = _.clone(circuitComponents[parameters.typeName]);

        return _.extend(component, parameters);
    };
});