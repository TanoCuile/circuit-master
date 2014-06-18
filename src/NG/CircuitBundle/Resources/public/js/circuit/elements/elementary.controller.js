MasterApp.module('Circuit', function initializeElementaryController(circuit, app, backbone, marionette, $, _){
    circuit.ElementaryController = marionette.Controller.extend({
        context: '',
        getContext: function(){
            this.initContext();

            return this.context;
        },
        getView: function(){
            return this.view;
        },
        getModel: function(){
            return this.model;
        },

        getJSON: function(){

        },

        // Circuit required functions
        show: function(){
            this.view.render();
        },
        getPlacementData: function(){
            console.error('Cannot get dimension');
        },

        activate: function(){
            this.model.set('active', true);
        },
        unActivate: function(){
            if (!this.model.get('inAction') && !this.model.get('chosen')) {
                this.model.set('active', false);
            }
        },

        choose: function(){
            this.model.set('choose', true);
        },

        initContext: function () {
            if (!this.context) {
                if (_.has(this, 'model')) {
                    this.context = this.model.get('id');
                } else {
                    console.error('No context for binding');
                }
            }
        },

        // Manage event bindings
        bind: function(listed, event, callback){
            this.initContext();
            if (this.listedObjects.indexOf(listed) < 0) {
                this.listedObjects.push(listed);
                this.listedOn['obj.' + this.listedObjects.indexOf(listed)] = {};
            }
            this.listedOn['obj.' + this.listedObjects.indexOf(listed)][event] = callback;
            listed.on(event, callback, this.context);
        },
        unBind: function(object){
            _.each(this.listedOn['obj.' + this.listedObjects.indexOf(object)], function(callback, event){
                object.off(event, null, this.context);
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
            object.off(event, null, this.context);
        }
    });
});