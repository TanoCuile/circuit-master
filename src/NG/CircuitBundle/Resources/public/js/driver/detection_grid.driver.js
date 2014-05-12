MasterApp.module('Driver', function (module, app, Backbone, Marionette, $, _) {
    module.DetectionGrid = function(_){
        var x = {};

        var controls = {};

        var connections = {};

        this.addPoint = function(id, element){
            controls[id] = element.get('position');
        };

        this.addConnection = function(id, element){
            connections[id] = {
                start: element.get('start'),
                finish: element.get('finish')
            };
        };

        this.calculateGrid = function(elements){
            var position = null;
            var id = null;

            _.each(controls, function(position, id){
                position = elements[id].get('position');
                id = elements[id].get('id');
                controls[elements[id].get('id')] = position;
                x[position.x] = id;
            }.bind(this));

            // TODO: selection connection
//            _.each(connections, function(){
//
//            });

            _.sortBy(x);
        };

        this.quickFind = function(position, except){
            var k = position.x;
            var found = false;
            for (var i = k - module.gridPrecision; i < k + module.gridPrecision; ++i) {
                // Find by x
                if (x[i] && x[i] != except) {
                    found = x[i];
                    // Check by y
                    if (controls[found]){
                        var y = controls[found].y;
                        if (position.y < y + app.Driver.gridPrecision && position.y > y - module.gridPrecision) {
                            return module.getElement(found);
                        }
                    } else {
                        console.error('Element found but no info about', found, controls, position);
                    }
                }
            }
            return false;
        }
    };

    module.controlGrid = new module.DetectionGrid(_);
});