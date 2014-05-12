MasterApp.module('Driver', function (module, app, Backbone, Marionette, $, _) {
    var notRealizedException = function(){
        console.error('Not realized yet');
    };
    module.requirements = {
        createControlPoint: function (x, y, id) {notRealizedException();},
        createPoint: function (x, y, id) {notRealizedException();},

        createLine: function(pointStart, pointFinish, id){notRealizedException();},

        createPin: function(position, component){notRealizedException();},
        createComponent: function(parameters){notRealizedException();}
    };
});