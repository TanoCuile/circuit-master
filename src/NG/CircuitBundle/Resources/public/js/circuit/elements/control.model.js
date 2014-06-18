MasterApp.module('Circuit', function initializeControlModel(circuit, app, Backbone, Marionette, $, _){
    circuit.Pin = circuit.Elementary.extend({
        defaults: {
            offsetPosition: new circuit.Position(),
            connectedTo: '',
            connection: null
        },
        customInitialize: function(options){
            if (this.get('connection') && this.get('connection')) {
                this.set('connection', new circuit.Point(this.get('connection')));
            }
        },
        toJSON: function(){
            var connection = {};
            if (this.get('connection')) {
                if (this.get('connection').attributes){
                    connection = this.get('connection').toJSON();
                } else {
                    connection = this.get('connection');
                }
            }
            delete this.attributes.component;
            return _.extend(this.attributes, {
                'offsetPosition': this.get('offsetPosition'),
                'connectedTo': this.get('connectedTo'),
                'connection': connection,
                'id': this.get('id'),
                'name': this.get('name'),
                'orientation': this.get('orientation')
            })
        }
    });
});