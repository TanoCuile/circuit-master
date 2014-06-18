(function($){
    $(document).ready(function(){
        if ($('.outer').height() < 400) {
            $('.outer').css('height', '100%');
            $('#content').css('height', '100%');
            $('.inner').css('height', '100%');
        }
        //$('#content').height($(window).height());
    });
})(jQuery);