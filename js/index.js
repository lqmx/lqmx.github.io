$(function () {
    var winHeight =$(document).height(),
        winWidth = $(document).width();
    var second = 0;
    var timer=null;
    $.each(notes, function (k, v) {
        $('.table').append('<div class="paper" data-url="'+ v.url + '"><div class="title">' + v.title + '</div><diiv class="date">' + v.date + '</diiv></div>');
    });
    $('.paper').each(function (k, v) {
        var style = {
            left: (Math.random()*winWidth * 0.8).toFixed(2) + 'px',
            top: (Math.random()*winHeight * 0.8).toFixed(2) + 'px',
            transform:"rotate(" + (Math.random()*360).toFixed(0)+ "deg)"
        };
        $(v).hover(function () {
            timer=setInterval(function() {
                if(++second > 1) {
                    $(v).css({
                        transform:"rotate(0deg) scale(1.1)"
                    });
                }
            },1000);
        }, function () {
            $(this).css(style);
            clearInterval(timer);
            second = 0;
        });
        $(v).click(function () {
            window.location.href = window.location.origin + "/note/" + $(v).attr('data-url');
        });
        $(v).css(style).show();
    });
});