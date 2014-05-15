MasterApp.module('Driver.svg', function (module, app, Backbone, Marionette, $, _) {
    module.ElementaryView = Backbone.View.extend({
        listedObjects: [],
        listedOn: {},
        rendered: false,
        representation: null,
        prepareRepresentation: function(){
            if(this instanceof module.ComponentView) {
                module.componentGroup.add(this.$el);
            } else if (this instanceof module.ControlView) {
                module.controlGroup.add(this.$el);
            } else if (this instanceof module.ConnectionView) {
                module.connectionsGroup.add(this.$el);
            } else if(this instanceof module.BGView) {
                module.backgorundGroup.add(this.$el);
            }
            this.$el.attr({'id': this.model.get('id')});
            this.listen();
        },
        listen: function(){},
        destroy: function(){
            this.unBindAll();
            this.stopListening();
            this.remove();
        },
        remove: function () {
            if (this.$el) {
                this.$el.remove();
                this.$el = null;
            }
            this.el = null;
            this.rendered = false;
        },
        redraw: function(){
            this.remove();
            this.draw();
        },
        draw: function () {
            this.$el = this.createRepresentation();
            this.el = this.$el.node;

            this.decorate();

            this.prepareRepresentation();
            this.rendered = true;
        },
        render: function(){
            if (!this.rendered){
                this.draw();
            } else {
                this.redraw();
            }
            return this;
        },
        modelListen: function(){
            this.bind(this.model, 'change:position', this.move.bind(this));
            //this.model.on('change:position', this.move.bind(this));
        },
        modelUnListen: function(){
            this.unBind(this.model);
        },
        move: function(){
            this.$el.attr(this.model.get('position'));
        },
        defaultInitialize: function(){
            this.modelListen();
        },
        initialize: function(options){
            this.defaultInitialize();
        },
        // off(event, object, context)
        bind: function(listed, event, callback){
            this.context = this.model.get('id');
            if (this.listedObjects.indexOf(listed) < 0) {
                this.listedObjects.push(listed);
                this.listedOn['obj.' + this.listedObjects.indexOf(listed)] = {};
            }
            this.listedOn['obj.' + this.listedObjects.indexOf(listed)][event] = callback;
            listed.on(event, callback, this.model.get('id'));
        },
        unBind: function(object){
            _.each(this.listedOn['obj.' + this.listedObjects.indexOf(object)], function(callback, event){
                object.off(event, null, this.model.get('id'));
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
            object.off(event, null, this.model.get('id'));
        }
    });
});