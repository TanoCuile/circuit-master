MasterApp.module('Circuit', function initializeComponentModel(circuit, app, backbone, marionette, $, _){
    circuit.Component = circuit.Elementary.extend({
        basicDefaults: {
            typeName: '',
            image: '',
            helpImages: '',
            rotation: 0,
            active: false,
            chosen: false,
            inAction: false,
            position: new circuit.Position(),
            endPoint: new circuit.Position(),
            parameters: new Backbone.Collection({model: circuit.Parameter}),
            pinCollection: new Backbone.Collection({model: circuit.Pin})
        },
        currentDefaults: {},
        defaults: function(){
            return _.extend({}, this.basicDefaults, this.currentDefaults);
        },

        customInitialize: function(options){
            if (options.position) {
                options.position.h = parseInt(options.position.h);
                options.position.w = parseInt(options.position.w);
                options.position.x = parseInt(options.position.x);
                options.position.y = parseInt(options.position.y);
                options.endPoint = {};
                options.endPoint.x = options.position.x + options.position.w;
                options.endPoint.y = options.position.y + options.position.y;
                this.set('position', options.position);
                this.set('endPoint', options.endPoint);
            }
            if (options.parameters) {
                this.parameters.add(options.parameters);
            }
        },
        toJSON: function(){
            var parameters = {};
            // Save parameters
            this.get('parameters').each(function(parameter, name){

            });

            var pinCollection = {};

            this.get('pinCollection').each(function(pin){
                pinCollection[pin.get('id')] = pin.toJSON();
            });

            return {
                rotation: this.get('rotation'),
                id: this.get('id'),
                parameters: parameters,
                'image': this.get('image'),
                'helpImages': this.get('helpImages'),
                position: this.get('position'),
                typeName: this.get('typeName'),
                'pinCollection': pinCollection
            }
        }
    });
});