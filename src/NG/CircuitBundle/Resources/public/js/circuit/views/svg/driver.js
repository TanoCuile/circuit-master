MasterApp.module('Circuit.View', function initializeDriver(views, app, Backbone, Marionette, $, _) {
    views.Driver = function (canvas) {
        this.canvas = new Snap(canvas);

        this.backgorund = this.canvas.group();
        this.connections = this.canvas.group();
        this.components = this.canvas.group();
        this.controls = this.canvas.group();
    };
});