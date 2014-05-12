MasterApp.module('Driver', function (module, app, Backbone, Marionette, $, _) {
    module.Elementary = Backbone.Model.extend({
        defaults: {
            id: false
        },
        isNew: function(){
            return !this.get('needSync');
        },
        generateId: function(){
            if (!this.get('id')) {
                this.set('id', Math.random().toString(36).substring(10));
            }
        },
        initialize: function(){
            this.generateId();
            this.on('destroy', this.removeFromGlobals.bind(this));
        },
        removeFromGlobals: function(){
            app.Driver.removeElement(this.get('id'));
        }
    });

    module.ActiveElementary = module.Elementary.extend({
        activate: function(){
            this.set('active', true);
        },
        isChosen: function(){
            if (this.get('chosen')) {
                this.activate();
            } else {
                this.set('active', false);
            }
        }
    });
});