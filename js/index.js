define(function (require) {
    var $ = require('jquery'),
        KeyBoard = require('../js/comm/keyevent'),
        Drag = require('../../module/drag/Drag'),
        SearchBar = require('../../module/searchbar/SearchBar');
    $(function () {
        var htmlDir = "/data/html/";
        var winHeight = $(document).height(),
            winWidth = $(document).width();
        var paperInfo = [];
        var isToPage = false;
        var hideType = ['comic'];

        var $paper = $('.paper');

        $paper.each(function (k, v) {
            var deg = (Math.random()*360).toFixed(2);
            var transformStyle = "rotate("+deg+"deg)";
            var paper = {
                wr: Math.random().toFixed(2),
                hr: Math.random().toFixed(2),
                transform: transformStyle
            };
            paperInfo.push(paper);
            $(v).css({
                left: Math.abs(winWidth * paper.wr - 273).toFixed(2) + 'px',
                top:  Math.abs(winHeight * paper.hr - 273).toFixed(2) + 'px',
                transform: paper.transform
            }).show();
        });
        $paper.each(function (k, v) {
            var url = window.location.origin + htmlDir + $(v).attr('data-url');
            var type = $(v).attr('data-type');
            if(hideType.toString().indexOf(type) > -1) {
                $(v).hide();
            }
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
        });
        SearchBar.init();
        SearchBar.bindInputEvt(function (obj, e) {
            var searchText = $(obj).val();
            $paper.each(function (k, v) {
                 var type = $(v).attr('data-type');
                 var title = $(v).find('.title').text();
                 if((type.indexOf(searchText) === -1
                 && title.indexOf(searchText) === -1) || hideType.toString().indexOf(type) > -1) {
                     $(v).hide();
                 } else {
                     $(v).show();
                 }
            });
        });
        KeyBoard.bind('Ctrl-Shift-F', function () {
           SearchBar.show();
           return false;
        });
        KeyBoard.bind('Escape', function () {
            SearchBar.hide();
        });
        KeyBoard.listen();
    });
});