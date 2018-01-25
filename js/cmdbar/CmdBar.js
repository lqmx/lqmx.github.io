var CmdBar = (function () {
    var params = {},
        tpl = '<div class="cmd-bar"> ' +
            '<input type="text">' +
            '<ul></ul> ' +
            '<div class="tip"></div>' +
            '</div>';

    var self = this;
    self.$cmdBar = null;
    self.$input = null;
    self.$tip = null;
    self.$list = null;
    self.cmds = [];
    self.cmd = "";

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
        $.each(self.cmds, function (k, v) {
            self.$list.append('<li class="clear"><span>' + v.cmd + '</span><span class="des ">' + v.des + '</span></li>');
            self.cmdMap[v.cmd] = k;
        });
    }
    function _initEvt() {
        self.$input.keyup(function (event) {
            var val = $(this).val();
            if (val === '' || val.length < 1) {
                hide();
                return true;
            }
            self.cmd = val.substr(1);
            if (event.key === 'Enter') {
                if(self.cmdMap[self.cmd] === undefined) {
                    undefinedCmd();
                    return true;
                }
                hide();
                var result = self.cmds[self.cmdMap[self.cmd]]['handle']();
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
        $(document).keydown(function(event){
            if(event.target === document.body
                && event.shiftKey
                && event.key === ':') {
                CmdBar.show();
            }
            if(event.key === 'Escape') {
                $('.draw-board').hide();
                CmdBar.hide();
            }
        });
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
        if(isShowList === undefined) {
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
        init: init,
        show: show,
        hide: hide
    };
})();