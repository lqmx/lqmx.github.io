define(['jquery'], function($) {
    return (function () {

        var tpl = '<div class="note"><div class="head">Note</div><textarea spellcheck="false"></textarea></div>';
        var self = this;
        self.$note = $('.note');

        function init(event) {
            if (self.$note.length > 0) {
                show();
                return true;
            }
            $(document.body).append(tpl);
            self.$note = $('.note');
            if (event !== void 666) {
                event();
            }
            show();
        }

        function show() {
            self.$note.show().find('textarea').focus();
        }

        function hide() {
            self.$note.hide().find('textarea').val('');
        }

        function getEl() {
            return self.$note;
        }

        return {
            getEl: getEl,
            init: init,
            show: show,
            hide: hide
        };
    })();
});