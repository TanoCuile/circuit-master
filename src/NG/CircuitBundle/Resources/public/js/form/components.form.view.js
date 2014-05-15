MasterApp.addInitializer(function initializeComponentsForm(){
    var ComponentsForm = Backbone.View.extend({
        'events': {
            'click #componentTypes a': 'openTab'
        },
        initialize: function(options){
            this.$el.find('.preview img').draggable({
                helper: 'clone',
                appendTo: 'body',
                containment: 'window',
                scroll: false
            });
        },
        openTab: function(e){
            e.preventDefault(true);

            $(e.target).tab('show');
        }
    });
    var form = jQuery('.component_types_list');
    if (form.length > 0) {
        MasterApp.componentsForm = new ComponentsForm({
            el: form[0]
        })
    }
});