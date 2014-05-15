MasterApp.addInitializer(function circuitInitialize(options){
    var circuit = window.circuitData;
    if (!circuit) {
        circuit = {};
    }

    MasterApp.Circuit.initializeController({
        'circuit': circuit,
        'components': circuitComponents,
        'canvas': options.canvas,
        'canvasDriver': options.canvasDriver
    });
});