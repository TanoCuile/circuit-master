MasterApp.module('Circuit.View', function initializeSVGElementaryView(circuit, app, backbone, marionette, $, _){
    circuit.ElementarySVGView = circuit.ElementaryView.extend({
        render: function(){
            this.draw();
            this.prepareElement();
            return this;
        },
        listenModel: function(){
            if (this.model) {
                this.model.on('destroy', this.destroy.bind(this));
            }
        },
        destroy: function(){
            console.log('view remove');
            this.$el.remove();
        },
        draw: function(){},
        prepareElement: function(){
            this.$el.attr({
                'id': this.model.get('id')
            })
        }
    })
});