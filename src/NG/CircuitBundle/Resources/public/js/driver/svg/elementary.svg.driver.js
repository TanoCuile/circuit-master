MasterApp.module('Driver.svg', function (module, app, Backbone, Marionette, $, _) {
    module.ElementaryView = Backbone.View.extend({
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
            this.stopListening();
            this.remove();
        },
        remove: function () {
            this.$el.remove();
            this.$el = null;
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
            this.model.on('change:position', this.move.bind(this));
        },
        move: function(){
            this.$el.attr(this.model.get('position'));
        },
        defaultInitialize: function(){
            this.modelListen();
        },
        initialize: function(options){
            this.defaultInitialize();
        }
    });
});