MasterApp.module('Circuit', function initializeCircuitModel(module, view, Backbone, Marionette, $, _){
    module.Circuit = Backbone.Model.extend({
        defaults: {
            'components': [],
            'connections': []
        },
        initialize: function(options){
            if (!(this.get('components') instanceof Backbone.Collection)) {
                this.set('components', new Backbone.Collection(this.get('components'), {model: module.Component}));
            }
            if (!(this.get('connections') instanceof Backbone.Collection)) {
                this.set('connections', new Backbone.Collection(this.get('connections'), {model: module.Component}));
            }
        },

        addComponent: function(component){
            this.get('components').add(component);
        },
        addConnection: function(connection){
            this.get('connections').add(connection);
        },
        toJSON: function(){
            var components = {};
            this.get('components').each(function(component, context){
                components[context] = component.toJSON()
            });
            return {
                components: components
            }
        }
    });
});