MasterApp.addInitializer(function circuitInitialize(options){
    var circuit = window.circuitData;
    if (!circuit) {
        circuit = {};
    }

    MasterApp.Circuit.initializeController({
        'circuitInfo': circuit,
        'componentTypes': circuitComponents,
        'canvas': options.canvas,
        'canvasDriver': options.canvasDriver,
    });
});