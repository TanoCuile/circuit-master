MasterApp.module('Circuit.View', function initializeControlView(views, app, backbone, marionette, $, _) {
    views.ControlView = views.ElementarySVGView.extend({
        listenElement: function () {
            this.$el.mouseover(this.onMouseOver.bind(this))
                .mouseout(this.onMouseOut.bind(this))
                .click(this.onClick.bind(this))
                .dblclick(this.onDbClick.bind(this))
                .drag(this.drag.bind(this), this.dragStart.bind(this), this.dragFinish.bind(this))
        },
        onMouseOver: function () {
            this.controller.activate();
        },
        onMouseOut: function () {
            this.controller.unActivate();
        },


        onClick: function () {
            this.controller.choose();
        },

        onDbClick: function () {
            this.controller.ShowPreview();
        }
    });

    views.PinView = views.ControlView.extend({
        radius: 3,
        listenModel: function () {
            this.model.on('change:active', this.checkActive.bind(this));
            this.model.on('destroy', this.destroy.bind(this));
        },
        getRealPosition: function () {
            var pos = this.model.get('offsetPosition');
            var basePosition = this.controller.getComponent().getModel().get('position');
            return {x: basePosition.x + pos.x, y: basePosition.y + pos.y};
        },
        draw: function () {
            var realPosition = this.getRealPosition();
            this.$el = views.driver.canvas.circle(realPosition.x, realPosition.y, this.radius);
            this.checkActive();
            views.driver.controls.add(this.$el);
            this.listenElement();
        },
        rebase: function (componentPosition) {
            var pos = this.model.get('offsetPosition');
            pos = {
                'cx': pos.x + componentPosition.x,
                'cy': pos.y + componentPosition.y
            };
            this.$el.attr(pos);
            pos = {
                x: pos.cx,
                y: pos.cy
            };
            this.controller.rebase(pos);
        },
        checkActive: function () {
            if (this.model.get('active')) {
                this.$el.attr({
                    'class': 'active'
                })
            } else {
                this.$el.attr({
                    'class': ''
                });
            }
        },
        drag: function (dx, dy, e) {
            this.curPos = {
                y: this.defPosition.y + dy,
                x: this.defPosition.x + dx
            };
            this.newLine.attr({
                'x2': this.curPos.x,
                'y2': this.curPos.y
            });

            this.controller.moveConnectionTo(this.curPos);
        },
        dragStart: function (e) {
            this.model.set('inAction', true);
            this.model.set('active', true);

            this.defPosition = this.getRealPosition();
            this.curPos = this.defPosition;

            // connection tmp line
            this.newLine = views.driver.canvas.line(this.curPos.x, this.curPos.y, this.curPos.x, this.curPos.y);
            views.driver.connections.add(this.newLine);
            this.newLine.attr({
                stroke: '#000',
                'stroke-width': 2
            });
        },
        dragFinish: function (x) {
            this.model.set('inAction', false);

            this.newLine.remove();
            this.newLine = null;
            this.controller.connectTo(this.curPos);
        }
    });
});