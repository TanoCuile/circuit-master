(function($){
    window.MasterApp = new Marionette.Application();

    $(document).ready(function(){
        console.log('Doc ready');
        MasterApp.start({
            canvas: $('.svg-holder .svg-container svg'),
            canvasDriver: 'svg'
        });
    })
})(jQuery);