MasterApp.module('Circuit.View', function initializeCircuitView(views, app, Backbone, Marionette, $, _) {
    views.ComponentView = views.ControlView.extend({
        listenModel: function(){
        },
        setPin: function(pin){
            this.pin = pin;
            _.each(this.pin, function(pin){
                pin.render();
            });
        },
        draw: function(){
            this.el = new Image();
            this.el.onload = function onImageLoad(){
                var pos = this.model.get('position');
                var dimension = this.getDimension();
                this.$el = views.driver.canvas.image(this.model.get('image'), pos.x, pos.y, dimension.w, dimension.h);
                views.driver.components.add(this.$el);
                this.listenElement();
            }.bind(this);
            this.el.src = this.model.get('image');
        },
        getDimension: function(){
            if (this.el) {
                return {
                    w: this.el.width,
                    h: this.el.height
                }
            }
            console.error('No image yet');
        },

        drag: function(dx, dy, e){
            this.curPos = {
                y: this.defPosition.y + dy,
                x: this.defPosition.x + dx
            };
            this.$el.attr(this.curPos);
            _.each(this.pin, function movePin(pin, name){
                pin.rebase(this.curPos);
            }.bind(this));
        },
        dragStart: function(e){
            this.model.set('inAction', true);

            this.defPosition = this.model.get('position');
            this.curPos = this.defPosition;
        },
        dragFinish: function(x){
            this.model.set('inAction', false);

            this.model.set('position', this.curPos);
        }
    });
});