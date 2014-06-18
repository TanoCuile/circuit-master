MasterApp.module('Circuit', function initializeControlController(circuit, app, Backbone, Marionette, $, _){
    circuit.PinController = circuit.ElementaryController.extend({
        initialize: function(options){
            if (!_.has(options, 'component')) {
                console.error('Invalid options', options);
            }
            this.component = options.component;

            this.model = new circuit.Pin(options);

            this.view = new circuit.View.PinView({
                model: this.model,
                controller: this
            });
        },
        getComponent: function(){
            return this.component;
        },
        moveConnectionTo: function(position){
//            var control = circuit.controller.checkPosition(position);
//            if (control instanceof circuit.PinController) {
//                control.activate();
//            }
        },
        connectTo: function(position, pin){
            var finish = circuit.controller.checkPosition(position);
            if (finish && this.validateConnection(finish) && finish.validateConnection(this)) {
                var controlPoints =  circuit.buildConnection(this, finish);
                var connection = new circuit.ConnectionController({
                    'controlPoints': controlPoints,
                    'start': this,
                    'finish': finish
                });
                this.model.set('connectedTo', finish.getContext());
                this.model.set('connection', connection.getFirstPoint());
                this.setConnection(connection, connection.getFirstLine().getMoveStart());
                finish.setConnection(this.getConnection(), connection.getLastLine().getMoveFinish());
            }
        },
        reStoreConnection: function(finish){
            console.log(this.model.get('connection'));
            var connection = new circuit.ConnectionController({
                'controlPoints': this.model.get('connection'),
                'start': this,
                'finish': finish
            });
            this.setConnection(connection, connection.getFirstLine().getMoveStart());
            finish.setConnection(this.getConnection(), connection.getLastLine().getMoveFinish());
        },
        validateConnection: function(component){
            return true;
        },
        disconnect: function() {
            this.model.set('connectedTo', null);
            this.model.set('connection', null);
            this.removeConnection();
        },
        setConnection: function(connection, rulePoint){
            this.connection = connection;
            this.connectioRulePoint = rulePoint;
        },
        removeConnection: function(){
            delete this.connection;
            delete this.connectioRulePoint;
        },
        getConnection: function(){
            return this.connection;
        },
        setConnectionRulePoint: function(rulePoint){
            return this.connectioRulePoint = rulePoint;
        },
        getConnectionRulePoint: function(){
            return this.connectioRulePoint;
        },
        rebase: function(position) {
            var pointMove = null;
            if (pointMove = this.getConnectionRulePoint()) {
                pointMove(position);
            }
        }
    });
});