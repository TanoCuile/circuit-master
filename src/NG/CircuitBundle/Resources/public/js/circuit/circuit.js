MasterApp.addInitializer(function circuitInitialize(options){
    var circuit = window.circuitData;
    if (!circuit) {
        circuit = {};
    }

    MasterApp.Circuit.initializeController({
        'circuit': circuit,
        'canvas': options.canvas,
        'canvasDriver': options.canvasDriver
    });
});