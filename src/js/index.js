var INDEX = (function () {

    /**
     * Credits to https://css-tricks.com/snippets/jquery/smooth-scrolling/
     */
    function bindAnchors(){
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 50
                    }, 1000);
                    return false;
                }
            }
        });
    }


    function init() {
        bindAnchors();
    }

    return {
        init: init
    };
}());