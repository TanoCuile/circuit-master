MasterApp.module('Circuit', function initializeComponentController(module, app, Backbone, Marionette, $, _){
    module.componentTypes = {};
    module.ComponentController = module.ElementaryController.extend({
        initializePinCollection: function (options) {
            if (!(options.pinCollection instanceof Backbone.Collection)) {
                this.pin = {};
                var pinCollection = new Backbone.Collection([], {model: module.Pin});
                var pinViews = {};

                _.each(options.pinCollection, function addToCollection(options) {
                    options.offsetPosition.x = parseInt(options.offsetPosition.x);
                    options.offsetPosition.y = parseInt(options.offsetPosition.y);
                    options.component = this;
                    this.pin[options.name] = new module.PinController(options);

                    // Just for saving data
                    pinCollection.add(this.pin[options.name].getModel());

                    // For nice rendering without many events
                    pinViews[options.name] = this.pin[options.name].getView();
                }.bind(this));

                this.model.set('pinCollection', pinCollection);
                this.model.on('change:position', this.recalculateComponent.bind(this));
                this.view.setPin(pinViews);
            }
        },
        initializeModel: function (options) {
            this.model = new module.Component(options);
        },
        initializeView: function () {
            this.view = new module.View.ComponentView({
                controller: this,
                model: this.model
            });
        },
        initialize: function(options){
            this.initializeModel(options);
            console.log(this.model);

            this.initializeView();

            this.initializePinCollection(options);
        },

        postBuild: function(collection, pinCollection){
            _.each(this.pin, function(pin){
                if (pin.getModel().get('connectedTo')){
                    if (pinCollection[pin.getModel().get('connectedTo')]) {
                        pin.reStoreConnection(pinCollection[pin.getModel().get('connectedTo')]);
                    } else {
                        console.log(pinCollection);
                        console.log(pin.getModel().get('connectedTo'));
                        console.log('No element found');
                    }
                }
            });
        },

        getPin: function(){
            return this.pin;
        },

        getPlacementData: function(){
            return _.extend(this.model.get('position'), this.view.getDimension());
        },
        activate: function(){
            this.model.set('active', true);
            _.each(this.pin, function activatePin(pin, name){
                pin.activate();
            }.bind(this));
        },
        unActivate: function(){
            if (!this.model.get('inAction') && !this.model.get('chosen')) {
                this.model.set('active', false);
                _.each(this.pin, function unActivatePin(pin, name){
                    pin.unActivate();
                }.bind(this));
            }
        },

        choose: function(){
            this.model.set('choose', true);
            _.each(this.pin, function chosePin(pin, name){
                pin.choose();
            }.bind(this));

        },

        recalculateComponent: function(){
            // Maybe not better way
            module.controller.grid.recalculateComponent(this);
        },
        play: function(){
            console.log('Play');
        },
        stop: function(){
            console.log('Stop');
        }
    });
});