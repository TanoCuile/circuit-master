MasterApp.module('Driver.svg', function (module, app, Backbone, Marionette, $, _) {
    var Requirements = {
        registerElement: function (element) {
            app.Driver.addElement(element.model.get('id'), element.model, element);
            return element;
        },
        initializeControl: function (x, y, id) {
            return new app.Driver.ElementaryControll({
                position: {
                    x: x,
                    y: y
                },
                id: id
            });
        },
        createControlPoint: function (x, y, tmp, id) {
            var view = new module.ControlPointView({
                model: this.initializeControl(x, y, id)
            });
            if (!tmp) {
                return this.registerElement(view);
            }
            return view;
        },
        createPoint: function(x, y, tmp, id) {
            var view = new module.PointView({
                model: this.initializeControl(x, y, id)
            });
            if (!tmp) {
                return this.registerElement(view);
            }
            return view;
        },

        createLine: function(pointStart, pointFinish, id, tmp){
            if (!(pointStart instanceof app.Driver.ElementaryControll) || !(pointStart instanceof app.Driver.ElementaryControll)) {
                if (!(pointStart instanceof module.ControlView) || !(pointFinish instanceof module.ControlView)) {
                    console.error('Start and finish must be controlled', pointStart, pointFinish);
                } else {
                    pointStart = pointStart.model;
                    pointFinish = pointFinish.model;
                }
            }

            var line = new module.LineView({
                model: new app.Driver.ElementaryLink({
                    start: pointStart,
                    finish: pointFinish
                })
            });

            if (!tmp) {
                return this.registerElement(line);
            }
            return line
        },

        createPin: function(position, component){
            return this.registerElement(new module.PinView({
                model: new app.Driver.ElementaryPin({
                    offsetPosition: position,
                    component: component
                })
            }));
        },

        createComponent: function(parameters){
            parameters = _.extend({
                image: '',
                pinCollection: [],
                position: {
                    x: 0,
                    y: 0
                }
            },parameters);

            var model = new app.Driver.ElementaryComponent(parameters);

            if (!(parameters.pinCollection instanceof Backbone.Collection)) {
                var pinCollection = new app.Driver.PinCollection();
                _.each(parameters.pinCollection, function addToCollection(options){
                    pinCollection.add(this.createPin(options.position, model).render().model);
                }.bind(this));
                model.set('pinCollection', pinCollection);
            }

            return this.registerElement(new module.ComponentView({
                model: model
            }));
        }
    };
    _.extend(module, Requirements);
});