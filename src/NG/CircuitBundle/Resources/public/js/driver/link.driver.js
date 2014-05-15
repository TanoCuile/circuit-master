MasterApp.module('Driver', function (module, app, Backbone, Marionette, $, _) {
    module.ElementaryLink = module.ActiveElementary.extend({
        defaults: {
            start: null,
            finish: null,
            active: false
        },
        listen: function () {
            this.bind(this, 'change:chosen', this.isChosen);
            this.bind(this, 'change:active', this.activeControl);
//            this.on('change:chosen', this.isChosen);
//            this.on('change:active', this.onActive);

            this.bind(this.get('start'), 'destroy', this.destroy.bind(this));
            this.bind(this.get('finish'), 'destroy', this.destroy.bind(this));
//            this.get('start').on('destroy', this.destroy.bind(this));
//            this.get('finish').on('destroy', this.destroy.bind(this));

            this.listenDefault();
            console.log(this.listedOn);
            console.log(this.listedObjects);
            //this.on('destroy', this.removeFromGlobals.bind(this));
        },
        initialize: function(){
            this.generateId();

            this.listen();
        },
        onActive: function(){
            var active = this.get('active');
            this.get('start').set('active', active);
            this.get('finish').set('active', active);
        }
    });
});