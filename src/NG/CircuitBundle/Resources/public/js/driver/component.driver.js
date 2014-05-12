MasterApp.module('Driver', function (module, app, Backbone, Marionette, $, _) {
    module.ElementaryComponent = module.ActiveElementary.extend({
        defaults: {
            position: new module.Position(),
            chosen: false,
            active: false,
            inAction: false,
            pinCollection: null,
            image: ''
        },
        listen: function () {
            this.on('change:inAction', this.isInAction);
            this.on('change:chosen', this.isChosen);
            this.on('change:active', this.activeControl);

            this.on('destroy', this.removeFromGlobals.bind(this));
        },
        initialize: function() {
            this.generateId();
            this.listen();

        },
        isInAction: function() {
            if (this.get('isInAction')) {
                this.activate();
            }
        },
        activeControl: function() {
            if (this.get('inAction') || this.get('chosen')) {
                this.set('active', true);
            }
        },
        removeFromGlobals: function(){
            app.Driver.removeElement(this.get('id'));
            this.get('pinCollection').each(function destroyPin(element){
                element.destroy();
            });
        }
    });

    module.PinCollection = Backbone.Collection.extend({
        model: module.ElementaryPin
    });
});