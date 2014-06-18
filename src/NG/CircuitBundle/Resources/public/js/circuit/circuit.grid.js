MasterApp.module('Circuit', function initializeCircuitGrid(module, view, Backbone, Marionette, $, _){
    module.CircuitGrid = Marionette.Controller.extend({
        circuit: {},
        reservedAreaFromX: {},
        reservedArea: {},
        reservers: {},

        activePointX: {},
        activePointData: {},
        active: {},

        gridPrecession: 6,
        linePrecision: 6,

        initialize: function(options){
            if (!_.has(options, 'controller')) {
                console.error('Invalid options', options);
            }

            this.controller = options.controller;
        },
        addComponent: function(component){
            var dimension = component.getPlacementData();
            dimension.x2 = dimension.x + dimension.w;
            dimension.y2 = dimension.y + dimension.h;
            if (!_.has(this.reservedAreaFromX, dimension.x)) {
                this.reservedAreaFromX[dimension.x] = [];
            }
            this.reservedAreaFromX[dimension.x].push(component.getContext());
            this.reservedArea[component.getContext()] = dimension;
            this.reservers[component.getContext()] = component;

            _.each(component.getPin(), this.addPin.bind(this));
        },
        addConnection: function(connection){

        },
        checkInReservedArea: function(x, y){
            var area = {};
            var correct = true;
            _.each(this.reservedAreaFromX, function checkPieceArea(context, cx){
                if (cx < x){
                    area = this.reservedArea[context];
                    if (area.x2 > x && area.y < y && area.y2 > y) {
                        correct = false;
                        return {};
                    }
                }
            });
            return correct;
        },
        checkLine: function(startPoint, finishPoint, check) {
            if (check != 0) {
                check = 1;
            }
            var vertical = 1;
            var x = startPoint.x,
                y = startPoint.y,
                start = startPoint.y,
                finish = finishPoint.y;
            if (start.y == finish.y) {
                vertical = 0;
                start = startPoint.y;
                finish = finishPoint.y;
            }

            var count = Math.round((start - finish) / this.linePrecision);
            var factor = (start > finish)? -1:1;
            var prev = start;
            for (var i = 0; i < count; ++i) {
                prev += this.linePrecision * factor;
                if (check == 1) {
                    if (vertical && !this.checkInReservedArea(x, prev)) {
                        return false;
                    } else if(!this.checkInReservedArea(prev, y)) {

                    }
                }
            }
            return true;
        },
        addPin: function(pin, name){
            var position = pin.getView().getRealPosition();
            if (!_.has(this.activePointX, position.x)) {
                this.activePointX[position.x] = [];
            }
            this.activePointX[position.x].push(pin.getContext());
            this.activePointData[pin.getContext()] = position;
            this.active[pin.getContext()] = pin;
        },

        removePin: function(pin, name){
            var oldPosition = this.activePointData[pin.getContext()];
            delete this.activePointData[pin.getContext()];
            for (var index in this.activePointX[oldPosition.x]){
                if (this.activePointX[oldPosition.x][index] == pin.getContext()) {
                    delete this.activePointX[oldPosition.x][index];
                    break;
                }
            }
        },

        recalculateComponent: function(component){
            var oldDimension = this.reservedArea[component.getContext()];
            for (var index in this.reservedAreaFromX[oldDimension.x]){
                if (this.reservedAreaFromX[oldDimension.x][index] == component.getContext()) {
                    delete this.reservedAreaFromX[oldDimension.x][index];
                    break;
                }
            }
            delete this.reservedArea[component.getContext()];

            _.each(component.getPin(), this.removePin.bind(this));

            this.addComponent(component);
        },

        findPin: function(position){
            for(var i = position.x - this.gridPrecession; i < position.x + this.gridPrecession; ++i) {
                if (this.activePointX[i]) {
                    var index = this.activePointX[i];
                    if (typeof index == 'object') {
                        console.log(index);
                        var active;
                        _.each(index, function findInIndex(j) {
                            if (this.activePointData[j] && this.activePointData[j].y < position.y + this.gridPrecession &&
                                this.activePointData[j].y > position.y - this.gridPrecession) {
                                active = this.active[j];
                                return {};
                            }
                        }.bind(this));
                        console.log(active);
                        return active;
                    } else if (this.activePointData[index] && this.activePointData[index].y < position.y + this.gridPrecession &&
                        this.activePointData[index].y > position.y - this.gridPrecession) {
                        return this.active[index];
                    }
                }
            }
            return null;
        }
    });
});