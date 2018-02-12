define(function (require) {
    var $ = require('jquery'),
        Drag = require('../../module/drag/Drag');
    $(function () {
        var htmlDir = "/data/html/";
        var winHeight = $(document).height(),
            winWidth = $(document).width();
        var timer = null, second = 0;
        var paperState = Drag.PAPER_STATE_DRAG;

        $('.paper').each(function (k, v) {
            var transformStyle = "rotate(" + (Math.random() * 360).toFixed(0) + "deg)";
            $(v).hover(function () {
                timer = setInterval(function () {
                    if (Drag.isDrag === true) return;
                    if (++second > 1) {
                        $(v).css({transform: "rotate(0deg) scale(1.1)"});
                        paperState = Drag.PAPER_STATE_CLICK;
                    }
                }, 1000);
            }, function () {
                $(this).css({
                    transform: transformStyle
                });
                clearInterval(timer);
                second = 0;
                paperState = Drag.PAPER_STATE_DRAG;
            });
            $(v).click(function () {
                if (paperState === Drag.PAPER_STATE_CLICK) {
                    window.location.href = window.location.origin + htmlDir + $(v).attr('data-url');
                }
            });
            Drag.bind($(v));
            $(v).css({
                left: (Math.random() * (winWidth-160) * 0.8).toFixed(2) + 'px',
                top: (Math.random() * winHeight * 0.8).toFixed(2) + 'px',
                transform: transformStyle
            }).show();
        });
    });
});