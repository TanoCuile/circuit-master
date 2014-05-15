MasterApp.module('Driver', function (module, app, Backbone, Marionette, $, _) {
    module.Elementary = Backbone.Model.extend({
        listedObjects: [],
        listedOn: {},
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
            this.listen();
            this.on('destroy', this.removeFromGlobals.bind(this));
        },
        listen: function() {
            this.listenDefault();
        },
        listenDefault: function () {
            this.bind(this, 'destroy', this.removeFromGlobals.bind(this));
            this.bind(this, 'destroy', this.unBindAll.bind(this));
        },
        removeFromGlobals: function(){
            app.Driver.removeElement(this.get('id'));
        },
        bind: function(listed, event, callback){
            if (this.listedObjects.indexOf(listed) < 0) {
                this.listedObjects.push(listed);
                this.listedOn['obj.' + this.listedObjects.indexOf(listed)] = {};
            }
            this.listedOn['obj.' + this.listedObjects.indexOf(listed)][event] = callback;
            listed.on(event, callback, this.get('id'));
        },
        unBind: function(object){
            _.each(this.listedOn['obj.' + this.listedObjects.indexOf(object)], function(callback, event){
                console.log(event);
                console.log(this.get('id'));
                console.log(object._events);
                object.off(event, null, this.get('id'));
                console.log(object._events);
            }.bind(this));
            this.listedOn['obj.' + this.listedObjects.indexOf(object)] = {};
        },
        unBindAll: function(){
            for (var i in this.listedObjects){
                this.unBind(this.listedObjects[i]);
            }
            this.listedObjects = [];
            this.listedOn = {};
        },
        unBindEvent: function(object, event){
            delete this.listedOn['obj.' + this.listedObjects.indexOf(object)][event];
            object.off(event, null, this.get('id'));
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