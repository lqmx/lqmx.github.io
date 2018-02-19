// define(function (require) {
//     var $ = require('jquery'),
//         Drag = require('../../module/drag/Drag');
    $(function () {
        var htmlDir = "/data/html/";
        var winHeight = $(document).height(),
            winWidth = $(document).width();
        var paperInfo = [];
        var isToPage = false;

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
            var url = window.location.origin + htmlDir + $(v).attr('data-url');
            $(v).click(function () {
                if (isToPage === true
                    && !Drag.hasMoving()) {
                    window.location.href = url;
                } else {
                    $(v).css({
                        "z-index": 2,
                        transform: "rotate(0deg) scale(1.1)"
                    });
                    isToPage = true;
                }
            });
            $(v).hover(function () {
                $(this).css({
                    "z-index": 2
                });
            }, function () {
                $(this).css({
                    "z-index": 1
                });
            });
            $(v).mouseleave(function () {
                if(Drag.getDragStatus() == Drag.DRAG_STATUS.DRAGING) return;
                $(this).css({
                    transform: paperInfo[k].transform,
                    "z-index": 1
                });
                isToPage = false;
            });
            $(v).find('.goto').click(function () {
                window.location.href = url;
            });
            Drag.bind($(v));
        })
    });
// });