var CmdBar = (function () {
    var tpl = '<div class="cmd-bar"><input type="text"><ul></ul><div class="tip"></div></div>';

    var self = this;
    self.$cmdBar = null;
    self.$input = null;
    self.$tip = null;
    self.$list = null;
    self.cmds = [];
    self.cmd = "";
    self.keyEvt = {};

    function log(msg) {
        console.log(msg);
    }

    function init(data) {
        self.cmds = data;
        _initView();
        _initEvt();
        log('init');
    }

    function _initView() {
        $('body').append(tpl);
        self.$cmdBar = $('.cmd-bar');
        self.$input = $cmdBar.find('input');
        self.$tip = $cmdBar.find('.tip');
        self.$list = $cmdBar.find('ul');
        self.cmdMap = {};
        self.shortcutMap = {};
        $.each(self.cmds, function (k, v) {
            self.$list.append('<li class="clear"><span>' + v.cmd + '</span><span>' + v.shortcut + '</span><span class="des ">' + v.des + '</span></li>');
            self.cmdMap[v.cmd] = k;
            self.shortcutMap[v.shortcut.toLowerCase()] = k;
        });
    }
    function _initEvt() {
        self.$input.keyup(function (event) {
            var val = $(this).val().toLowerCase();
            if (val === '' || val.length < 1) {
                hide();
                return true;
            }
            self.cmd = val.substr(1);
            if (event.key === 'Enter') {
                if(self.cmdMap[self.cmd] !== void 666) {
                    self.cmds[self.cmdMap[self.cmd]]['handle']();
                    hide();
                } else if (self.shortcutMap[self.cmd] !== void 666) {
                    self.cmds[self.shortcutMap[self.cmd]]['handle']();
                    hide();
                } else {
                    undefinedCmd();
                }
            }
            self.$list.find('li').each(function (k, v) {
                if (self.cmd === ''
                    || $(v).find('span:first-child').text().indexOf(self.cmd) !== -1) {
                    $(v).show();
                } else {
                    $(v).hide();
                }
            });
        });

        bindKey('Escape', function () {
           hide();
        });

        KeyBoard.bind("Shift-:", function () {
            show();
        });
        KeyBoard.bind("Escape", function () {
            if(self.keyEvt['Escape'].length > 0) {
                $.each(self.keyEvt['Escape'], function (k, v) {
                    v();
                });
            }
        });
        // $(document).keydown(function(event){
        //     var key = event.key;
        //     if(event.target === document.body
        //         && event.shiftKey
        //         && key === ':') {
        //         show();
        //     }
        //     if(key === 'Escape') {
        //         if(self.keyEvt[key].length > 0) {
        //             $.each(self.keyEvt[key], function (k, v) {
        //                 v();
        //             });
        //         }
        //     }
        // });
    }

    function bindKey(key, fn) {
        if(self.keyEvt[key] === void 666) {
            self.keyEvt[key] = [];
        }
        var bolExist = false;
        $.each(self.keyEvt[key], function (k, v) {
            if(v === fn) bolExist = true;
        });
        if(!bolExist) {
            self.keyEvt[key].push(fn);
        }
    }

    function hide() {
        self.$input.val('');
        self.$cmdBar.hide();
        self.$tip.hide();
    }

    function tip(tip) {
        self.$tip.text(tip).show();
    }

    function show(isShowList) {
        if(isShowList === void 666) {
            isShowList = true;
        }
        if(isShowList) {
            self.$list.show();
        }else {
            self.$list.hide();
        }
        self.$cmdBar.show();
        self.$input.focus();
    }

    function undefinedCmd() {
        show(false);
        tip('undefined command');
    }

    return {
        keyEvt: self.keyEvt,
        bindKey: bindKey,
        init: init,
        show: show,
        hide: hide
    };
})();