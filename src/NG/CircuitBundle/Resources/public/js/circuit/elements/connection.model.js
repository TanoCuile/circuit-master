MasterApp.module('Circuit', function initializeConnectionModel(module, app, Backbone, Marionette, $, _){
    module.Connection = module.Elementary.extend({
        currentDefaults: {
            controlPoints: {},
            start: {},
            finish: {}
        },
        customInitialize: function(options) {
            if (!_.has(options, 'start') || !_.has(options, 'finish') || !_.has(options, 'controlPoints')) {
                console.error("Invalid options", options);
            }
            this.set('controlPoints', options.controlPoints);
        }
    });
    module.Point = Backbone.Model.extend({
        defaults: {
            f: 0,
            x: 0,
            y: 0,
            prev: null,
            next: null
        },
        initialize: function(options){
            if (!_.has(options, 'f') || !_.has(options, 'x') || !_.has(options, 'y')) {
                console.error('Invalid options', options);
            }
            this.set('x', parseInt(this.get('x')));
            this.set('y', parseInt(this.get('y')));
            this.set('f', parseInt(this.get('f')));
            if (options.next){
                this.setNext(new module.Point(options.next));
                this.getNext().setPrev(this);
            }
        },
        setNext: function(next){
            this.set('next', next);
            return this;
        },
        getNext: function(){
            return this.get('next');
        },
        setPrev: function(prev){
            this.set('prev', prev);
            return this;
        },
        getPrev: function(){
            return this.get('prev');
        },
        toJSON: function(){
            var attributes = _.clone(this.attributes);
            delete attributes['prev'];
            if (this.get('next')) {
                attributes.next = this.get('next').toJSON();
            }
            return attributes;
        },
        remove: function(){
            console.log('remove');
            var next = this.get('next');
            this.destroy();
            if (next) {
                next.remove();
            }
        }
    });
    module.Line = module.Elementary.extend({
        currentDefaults: {
            start: {},
            finish: {},
            axis: ''
        },
        customInitialize: function(options){
            if (!options.axis) {
                if (this.get('start').get('x') == this.get('finish').get('x')) {
                    this.set('axis', 'y');
                }
                if (this.get('start').get('y') == this.get('finish').get('y')) {
                    this.set('axis', 'x');
                }
            }
        }
    });
});