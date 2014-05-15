MasterApp.module('Driver', function (module, app, Backbone, Marionette, $, _) {
    module.ElementaryControll = module.ActiveElementary.extend({
        defaults: {
            position: new module.Position(),
            chosen: false,
            active: false,
            inAction: false
        },
        listen: function () {
            this.bind(this, 'change:inAction', this.isInAction.bind(this));
            this.bind(this, 'change:chosen', this.isChosen.bind(this));
            this.bind(this, 'change:active', this.activeControl.bind(this));
//            this.on('change:inAction', this.isInAction);
//            this.on('change:chosen', this.isChosen);
//            this.on('change:active', this.activeControl);

            this.bind(this, 'destroy', this.removeFromGlobals.bind(this));
            //this.on('destroy', this.removeFromGlobals.bind(this));
        },
        initialize: function(){
            this.generateId();
            this.listen();
        },
        isInAction: function(){
            if (this.get('isInAction')) {
                this.activate();
            }
        },
        activeControl: function(){
            if (this.get('inAction') || this.get('chosen')) {
                this.set('active', true);
            }
        }
    });

    module.ElementaryPin = module.ElementaryControll.extend({
        defaults: {
            offsetPosition: new module.Position(),
            chosen: false,
            active: false,
            inAction: false,
            component: false
        },

        listen: function () {
            this.bind(this, 'change:inAction', this.isInAction.bind(this));
            this.bind(this, 'change:chosen', this.isChosen.bind(this));
            this.bind(this, 'change:active', this.activeControl.bind(this));
            //this.on('change:inAction', this.isInAction);
//            this.on('change:chosen', this.isChosen);
//            this.on('change:active', this.activeControl);

            // TODO: add rotation effect
            this.bind(this.get('component'), 'change:position', this.calculatePosition.bind(this));
            this.bind(this.get('component'), 'change:chosen', this.componentCheckState.bind(this));
//            this.get('component').on('change:position', this.calculatePosition.bind(this));
//            this.get('component').on('change:chosen', this.componentCheckState.bind(this));

            this.listenDefault();
        },

        initialize: function(){
            this.generateId();
            this.calculatePosition(this.get('component'), this.get('component').get('position'));
            this.listen();
        },

        componentCheckState: function(component, value){
            this.set('chosen', value);
        },

        calculatePosition: function(component, value){
            var offPos = this.get('offsetPosition');
            this.set('position', {
                x: offPos.x + value.x,
                y: offPos.y + value.y
            });
        }
    });
});