MasterApp.module('Circuit.View', function initializeCircuitView(views, app, Backbone, Marionette, $, _) {
    views.CircuitView = Backbone.View.extend({
        el: $('.circuit-container .circuit-canvas')[0],
        driverInitialize: function () {
            views.driver = new views.Driver(this.el);
        },
        initialize: function(options){
            this.driverInitialize(options);

            this.$el.droppable({
                drop: this.onDrop.bind(this)
            });
        },

        getOffset: function(){
            var offset = this.$el.offset();
            offset.left = Math.floor(offset.left);
            offset.top = Math.floor(offset.top);

            return offset;
        },

        showComponent: function(component){
            component.show();
        },

        onDrop: function(e, ui){
            console.log(ui);
            console.log(e);
            app.vent.trigger('addNewComponent', e, ui);
        }
    });
});