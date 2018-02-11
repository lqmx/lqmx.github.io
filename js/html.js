define(function (require) {
    var $ = require('jquery'),
        KeyBoard = require('../js/comm/keyevent'),
        CmdBar = require('../module/cmdbar/CmdBar'),
        DrawBoard = require('../module/drawboard/DrawBoard'),
        Drag = require('../module/drag/Drag'),
        Note = require('../module/note/Note'),
        Catalog = require('../module/catalog/Catalog'),
        hljs = require('highlight/highlight.min');

    $(function () {
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

