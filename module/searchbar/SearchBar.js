define(['jquery'], function($) {
    return (function () {
        var tpl = '<div class="search-bar"><input type="text" placeholder="input note you need"></div>';
        var $searchBar = $('.search-bar');
        var $input = null;

        function init() {
            if($searchBar.length !== 0) {
                // $searchBar.show();
                return true;
            }
            $('body').append(tpl);
            $searchBar = $('.search-bar');
            $input = $searchBar.find('input');
            hide();
            return true;
        }

        function show() {
            if($searchBar.length === 0) return false;
            $searchBar.show();
            $input.focus();
        }

        function hide() {
            if($searchBar.length === 0) return false;
            $input.val('');
            $searchBar.hide();
        }

        function bindInputEvt(fn) {
            $input.keyup(function (e) {
                fn(this, e);
            });
        }

        return {
            bindInputEvt: bindInputEvt,
            show: show,
            hide: hide,
            init: init
        }
    })();
});