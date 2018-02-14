// define(function (require) {
//     var $ = require('jquery'),
//         Drag = require('../../module/drag/Drag');
    $(function () {
        var htmlDir = "/data/html/";
        var winHeight = $(document).height(),
            winWidth = $(document).width();
        var timer = null, second = 0;
        var paperState = Drag.PAPER_STATE_DRAG;

        var paperInfo = [];

        var $paper = $('.paper');

        $paper.each(function (k, v) {
            var transformStyle = "rotate("+(Math.random()*360).toFixed(2)+"deg)";
            var paper = {
                wr: Math.random().toFixed(2),
                hr: Math.random().toFixed(2),
                transform: transformStyle
            };
            paperInfo.push(paper);
            $(v).css({
                left: ((winWidth-160) * paper.wr).toFixed(2) + 'px',
                top:  ((winHeight-220) * paper.hr).toFixed(2) + 'px',
                transform: paper.transform
            }).show();
        });
        $paper.each(function (k, v) {
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
                    transform: paperInfo[k].transform
                });
                clearInterval(timer);
                second = 0;
                paperState = Drag.PAPER_STATE_DRAG;
            });

            var url = window.location.origin + htmlDir + $(v).attr('data-url');
            $(v).click(function () {
                if (paperState === Drag.PAPER_STATE_CLICK) {
                    window.location.href = url;
                }
            });
            $(v).find('.goto').click(function () {
                window.location.href = url;
            });
            Drag.bind($(v));
        })
    });
// });