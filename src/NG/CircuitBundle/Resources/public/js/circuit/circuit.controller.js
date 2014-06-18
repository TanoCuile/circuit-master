MasterApp.module('Circuit', function initializeConstructorModule(circuit, app, backbone, marionette, $, _){
    var CircuitController = Marionette.Controller.extend({
        listen: function () {
            $('.play-circuit').click(function(e){
                e.preventDefault(true);
                this.playCircuit();
            }.bind(this));

            $('.save-circuit').click(function(e){
                e.preventDefault(true);
                this.saveCircuit();
            }.bind(this));
            app.vent.on('addNewComponent', this.addNewComponent.bind(this));
        },

        initialize: function(options){
            this.build = 1;

            this.componentTypes = options.componentTypes;

            this.view = new circuit.View.CircuitView(options);

            this.grid = new circuit.CircuitGrid({'controller': this});

            this.circuit = new circuit.Circuit({
                'components': [],
                'connections': [] // Может удалить ?
            });

            if (options.circuitInfo.components.length > 0) {
                _.each(options.circuitInfo.components, function pushComponent(component){
                    var componentInfo = this.createComponent(component);
                    this.addComponent(component.typeName, componentInfo);
                }.bind(this));
                _.each(this.grid.reservers,function hookPostBuild(component, context){
                    component.postBuild(this.grid.reservers, this.grid.active);
                }.bind(this));
            }

            this.listen();
        },

        saveCircuit: function(){
            var circuit = this.circuit.toJSON();
            console.log(circuit);
            $.ajax({
                'url': window.location.href,
                'type': 'POST',
                'data': circuit
            }).success(function(data){
                console.log(data);
            });
        },

        playCircuit: function(){
            if (this.build == 1) {
                this.build = 0;
                _.each(this.grid.reservers,function(component, context){
                    component.play();
                });
            } else {
                this.build = 1;
                _.each(this.grid.reservers,function(component, context){
                    component.stop();
                });
            }
        },

        createComponent: function(parameters){
            // parameters contain: position( {x:0,y:0} ) typeName
            var component = _.clone(circuitComponents[parameters.typeName]);

            return _.extend(component, parameters);
        },

        addComponent: function (type, componentInfo) {
            if (_.has(circuit.componentTypes, type)) {
                var component = new circuit.componentTypes[type](componentInfo);

                this.view.showComponent(component);

                this.circuit.addComponent(component.getModel());
                this.grid.addComponent(component);
            } else {
                console.error('Type is not registered', type)
            }
        },
        addNewComponent: function(e, ui){
            var offset = ui.position;
            var circuitOffset = this.view.getOffset();
            var type = ui.helper.data('element');
            var componentInfo = this.createComponent({
                position: {
                    x: Math.floor(offset.left) - circuitOffset.left,
                    y: Math.floor(offset.top) - circuitOffset.top
                },
                typeName: type
            });
            this.addComponent(type, componentInfo);
        },
        addConnection: function(connection){
            this.circuit.addConnection(connection);
            this.grid.addConnection(component);
        },

        checkPosition: function(position){
            return this.grid.findPin(position);
        }
    });

    this.controller = null;

    this.initializeController = function(options){
        if (!this.controller) {
            console.log('Init controller');
            this.controller = new CircuitController(options);
        }
        return this.controller;
    }
});