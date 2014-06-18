MasterApp.module('Circuit', function initializeElementaryModel(circuit, app, backbone, marionette, $, _){
    circuit.Position = function(){this.x = 0; this.y = 0;};

    circuit.Parameter = Backbone.Model.extend({
        basicDefaults: {
            value: 0,
            factor: 1,
            widgetType: 'simple',
            options: {}
        },
        currentDefaults: {},
        defaults: function(){
            return _.extend({}, this.basicDefaults, this.currentDefaults);
        },
        getValue: function(){
            return this.get('value') * this.get('factor');
        }
    });

    circuit.Elementary = Backbone.Model.extend({
        initialize: function(options){
            this.generateId();

            this.basicsListen();

            this.customInitialize(options);
        },

        customInitialize: function(options){},

        isNew: function(){
            return !this.get('needSync');
        },
        generateId: function(){
            if (!this.get('id')) {
                this.set('id', Math.random().toString(36).substring(10));
            }
        },

        basicsListen: function(){
            this.on('change:chosen', this.isChosen.bind(this), this.get('id'));
            this.on('change:isInAction', this.isInAction.bind(this), this.get('id'));
        },

        isChosen: function(){
            if (this.get('chosen')) {
                this.activate();
            } else {
                this.set('active', false);
            }
        },
        isInAction: function(){
            if (this.get('isInAction')) {
                this.activate();
            }
        }
    });
});
