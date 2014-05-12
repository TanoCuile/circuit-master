MasterApp.module('Driver.svg', function (module, app, Backbone, Marionette, $, _) {
    var SVGDriver = {
        initialize: function (options) {
            this.canvas = new Snap(options.canvas[0]);
            this.backgorundGroup = this.canvas.group();
            this.connectionsGroup = this.canvas.group();
            this.componentGroup = this.canvas.group();
            this.controlGroup = this.canvas.group();
        }
    };

    _.extend(module, SVGDriver, app.Driver.requirements);
});