define(function (require) {
    var $ = require('jquery'),
        KeyBoard = require('../js/comm/keyevent'),
        noteData = require('../../js/notes.js'),
        CmdBar = require('../module/cmdbar/CmdBar'),
        DrawBoard = require('../module/drawboard/DrawBoard'),
        Drag = require('../module/drag/Drag'),
        Note = require('../module/note/Note'),
        Catalog = require('../module/catalog/Catalog'),
        hljs = require('highlight/highlight.min');

    $(function () {
        var $container = $('body');
        var pageKey = window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1);
        if(noteData[pageKey]['isBg']) {
            $container.attr('style', 'display:block;background-image:url(../../data/img/'+noteData[pageKey]['bg']+');background-size: cover');
        } else {
            $container.addClass(noteData[pageKey]['bgColor']);
            var bgColor = $container.css('background-color');
            $container.removeClass(noteData[pageKey]['bgColor']).css({
                'background': 'rgba' + bgColor.substring(3, bgColor.length - 1) + ', .4)'
            });
        }
        CmdBar.init([{
            cmd: "draw",
            des: 'open the draw board',
            shortcut: 'D',
            handle: function () {
                DrawBoard.init(function () {
                    CmdBar.bindKey('Escape', function () {
                        DrawBoard.hide();
                    })
                });
            }
        }, {
            cmd: 'note',
            des: 'open the note',
            shortcut: 'N',
            handle: function () {
                Note.init(function () {
                    CmdBar.bindKey('Escape', function () {
                        Note.hide();
                    });
                });
                Drag.bind(Note.getEl());
            }
        }]);

        Catalog.init();
        Catalog.hide();
        KeyBoard.bind('Ctrl-C', function () {
            Catalog.isShow()? Catalog.hide():Catalog.show();
        });

        KeyBoard.listen();
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    });
});

