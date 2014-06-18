//MasterApp.addInitializer(function circuitInitialize(options) {
//    MasterApp.canvasDriver = MasterApp.Driver[options.canvasDriver];
//    MasterApp.canvasDriver.initialize(options);
//    MasterApp.vent.trigger('driver:init', MasterApp.canvasDriver);
//});

MasterApp.module('Driver', function (module, app, Backbone, Marionette, $, _) {
    var Driver = new function(){
        this.Position = function () {
            this.x = 0;
            this.y = 0;
        };

        this.gridPrecision = 6;

        var elementCollection = {};

        var chosen = [];

        this.addElement = function(id, element, view){
            elementCollection[id] = element;

            if (element instanceof module.ElementaryControll) {
                view.on('choseNew', this.choseNew);
                view.on('addToChosen', this.addToChosen);
                element.on('movedTo', this.controlGrid.calculateGrid.bind(this.controlGrid, elementCollection));
                this.controlGrid.addPoint(id, element);
            } else if (element instanceof module.ElementaryComponent) {
                view.on('choseSet', this.choseSet);
                view.on('addSetToChosen', this.addSetToChosen);
                this.controlGrid.addPoint(id, element);
            } else if (element instanceof module.ElementaryLink){
                view.on('choseSet', this.choseSet);
                view.on('addSetToChosen', this.addSetToChosen);
                this.controlGrid.addConnection(id, element);
            }

            this.controlGrid.calculateGrid(elementCollection);
        };

        var emptyChosen = function(){
            for(var i in chosen){
                elementCollection[chosen[i]].set('chosen', false);
            }
            chosen = [];
        };

        this.choseSet = function(set){
            emptyChosen();
            for (var i in set) {
                pushToChosen(set[i]);
            }
        };
        this.addSetToChosen = function(set){
            for (var i in set) {
                pushToChosen(set[i]);
            }
        };
        function pushToChosen(model) {
            chosen.push(model.get('id'));
            model.set('chosen', true);
        }

        this.choseNew = function(model){
            emptyChosen();
            pushToChosen(model);
        };

        this.addToChosen = function(model){
            pushToChosen(model);
        };

        this.removeElement = function(id){
            if (_.has(elementCollection, id)){
                delete(elementCollection[id]);
                this.controlGrid.calculateGrid(elementCollection);
            }
        };

        this.getElement = function(id, def){
            if (_.has(elementCollection, id)) {
                return elementCollection[id];
            }
            return def;
        }
    };

    _.extend(module, Driver);
});