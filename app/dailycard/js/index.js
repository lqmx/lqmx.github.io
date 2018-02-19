$(function () {
    var cardInfo = [];
    var winHeight = $(document).height(),
        winWidth = $(document).width();

    var $card = $('.card');

    $card.each(function (k, v) {
        var transformStyle = "rotate("+(Math.random()*360).toFixed(2)+"deg)";
        var card = {
            wr: Math.random().toFixed(2),
            hr: Math.random().toFixed(2),
            transform: transformStyle
        };
        cardInfo.push(card);
        $(v).css({
            left: ((winWidth-160) * card.wr).toFixed(2) + 'px',
            top:  ((winHeight-220) * card.hr).toFixed(2) + 'px',
            transform: card.transform
        }).show();
    });
    $card.each(function (k, v) {
        $(v).click(function () {
            $(v).css({
                "z-index": 2,
                transform: "rotate(0deg) scale(1.1)"
            });
        });
        $(v).mouseleave(function () {
            if(Drag.getDragStatus() == Drag.DRAG_STATUS.DRAGING) return;
            $(this).css({
                transform: cardInfo[k].transform,
                "z-index": 1
            });
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
        Drag.bind($(v));
    }) 
});