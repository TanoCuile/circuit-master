(function($){
    window.MasterApp = new Marionette.Application();

    $(document).ready(function(){
        MasterApp.start({
            canvas: $('.svg-holder .svg-container svg'),
            canvasDriver: 'svg'
        });
    })
})(jQuery);