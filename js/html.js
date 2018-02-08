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
        if(Catalog.isShow()) {
            Catalog.hide();
        } else {
            Catalog.show();
        }
    });

    KeyBoard.listen();
});