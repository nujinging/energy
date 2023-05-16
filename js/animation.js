$(function(){
    var Scroll = function(){
        var _winHei = $(window).height();
        var _section = $('.scroll_box'),
            currentIdx = 0;
        return {
            init : function (){
                this.animateEvent();
            },
            animateEvent : function() {
                $(_section[currentIdx]).find('.ready').removeClass('ready').addClass('animate');
                $(window).on('load scroll', function() {
                    var scrollPos = $(document).scrollTop(),
                        startPoint = scrollPos + _winHei * 0.9;
                    _section.each(function() {
                        var current = $(this);
                        currentIdx = current.index();
                        if(current.offset().top < startPoint) {
                            current.find('.ready').removeClass('ready').addClass('animate');
                        }
                    });
                });
            }
        }
    };
    var scroll = new Scroll();
    scroll.init();
});
