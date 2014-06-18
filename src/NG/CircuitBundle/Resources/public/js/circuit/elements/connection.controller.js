MasterApp.module('Circuit', function initializeConnectionController(module, app, Backbone, Marionette, $, _) {
    module.lineMinLength = 30;
    module.ConnectionController = module.ElementaryController.extend({
        initialize: function (options) {
            if (!_.has(options, 'start') || !_.has(options, 'finish')
                && !_.has(options, 'controlPoints')) {
                console.error('Invalid options' + options);
            }

            this.model = new module.Connection(options);

            this.firstPoint = options.controlPoints;
            this.start = options.start;
            this.finish = options.finish;

            this.buildConnection();
        },
        createLineView: function (line) {
            var view = new module.View.LineView({
                model: line,
                controller: this
            });
            view.render();
            return view;
        },
        destroy: function() {
            this.firstPoint.remove();
            this.firstLine.destroy();

            this.start.disconnect();
            this.finish.disconnect();

            delete this;
        },
        buildConnection: function(){
            var point = this.firstPoint;

            var line = null;
            var currentLine = null;
            this.firstLine = null;

            while(point){
                this.lastPoint = point;
                if(point.getPrev()){
                    line = new module.Line({
                        start: point.getPrev(),
                        finish: point
                    });

                    var view = this.createLineView(line);
                    if(!this.firstLine) {
                        this.firstLine = view;
                        currentLine = this.firstLine;
                    } else {
                        this.lastLine = view;
                        currentLine.setNext(view).getNext().setPrev(currentLine);
                        currentLine = currentLine.getNext();
                    }
                }

                point = point.getNext();
            }
        },
        getOppositeAxis: function (line) {
            var oppositeAxis = 'y';
            if (line.get('axis') == 'y') {
                oppositeAxis = 'x';
            }
            return oppositeAxis;
        },

        divideLine: function(x, y, line, view){
            var axis = line.get('axis');
            var oppositeAxis = this.getOppositeAxis(line);

            var middleFirstPoint = new module.Point({
                f: 1,
                x: x,
                y: y,
                prev: line.get('start')
            });
            var middleSecondPoint = new module.Point({
                f: 1,
                x: x,
                y: y,
                prev: middleFirstPoint
            });
            middleSecondPoint.setNext(line.get('finish'));
            middleFirstPoint.setNext(middleSecondPoint);
            line.get('start').setNext(middleFirstPoint);
            line.get('finish').setPrev(middleSecondPoint);

            var parallelLine = new module.Line({
                start: line.get('start'),
                finish: middleFirstPoint,
                axis: axis
            });
            var oppositeLine = new module.Line({
                start: middleFirstPoint,
                finish: middleSecondPoint,
                axis: oppositeAxis
            });

            line.set('start', middleSecondPoint);
            var parallelView = this.createLineView(parallelLine);
            var oppositeView = this.createLineView(oppositeLine);
            if (view.getPrev()) {
                parallelView.setPrev(view.getPrev()).getPrev().setNext(parallelView);
            } else {
                this.firstLine = parallelView;
                this.start.setConnectionRulePoint(parallelView.getMoveStart());
            }
            parallelView.setNext(oppositeView).getNext()
                .setPrev(parallelView).setNext(view).getNext().setPrev(oppositeView).redraw();
        },

        getFirstLine: function(){
            return this.firstLine;
        },
        getLastLine: function() {
            return this.lastLine;
        },
        getFirstPoint: function(){
            return this.firstPoint;
        }
    });

    module.buildConnection = function (start, finish) {
        var startPosition = start.getView().getRealPosition();
        var finishPosition = finish.getView().getRealPosition();

        var diffX = finishPosition.x - startPosition.x;
        var diffY = finishPosition.y - startPosition.y;

        // Points of connection will be linked list
        var points = new module.Point({
            f: 2,
            x: startPosition.x,
            y: startPosition.y
        });

        var firstPoint = points;

        function addPoint(points, data) {
            points.setNext(new module.Point(data));
            points.getNext().setPrev(points);
            points = points.getNext();
            return points;
        }

        if (Math.abs(diffX) > Math.abs(diffY)) {
            points = addPoint(points, {
                f: 1,
                x: startPosition.x + Math.round(diffX/2),
                y: startPosition.y
            });
            points = addPoint(points, {
                f: 1,
                x: startPosition.x + Math.round(diffX/2),
                y: finishPosition.y
            });
        } else {
            points = addPoint(points, {
                f: 1,
                x: startPosition.x,
                y: startPosition.y + Math.round(diffY/2)
            });
            points = addPoint(points, {
                f: 1,
                x: finishPosition.x,
                y: startPosition.y + Math.round(diffY/2)
            });
        }
        points = addPoint(points, {
            f: 2,
            x: finishPosition.x,
            y: finishPosition.y
        });
        return firstPoint;
    }
});
