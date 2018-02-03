var Catalog = (function () {

    var catalog_tpl = '<div class="catalog"></div>';
    var self = this;

    var $catalog = $('.catalog');

    function init() {
        if($catalog.length > 0){
            open();
            return true;
        }

        $(document.body).append(catalog_tpl);
        $catalog = $('.catalog');
        $catalog.append('<dl></dl>');
        var h2Index = 0, h3Index = 0;
        $('.md').children().each(function (k, v) {
            if(v.nodeName === 'H2') {
                $catalog.find('dl').append('<dt data-index="' + (h2Index++) + '">' + $(v).text() + '</dt>');
            }
            if(v.nodeName === 'H3'){
                $catalog.find('dl').append('<dd data-index="' + (h3Index++) + '">' + $(v).text() + '</dd>');
            }
        });
        $catalog.find('dt').click(function () {
            var h2 = $('.md').find('h2').eq($(this).attr('data-index'));
            console.log(h2.offset().top);
            $("html,body").animate({ scrollTop: h2.offset().top - 10 }, 2);
        });
        $catalog.find('dd').click(function () {
            var h3 = $('.md').find('h3').eq($(this).attr('data-index'));
            console.log(h3.offset().top);
            $("html,body").animate({ scrollTop: h3.offset().top - 10 }, 2);
        });
    }
    function open() {
        $catalog.show();
    }
    function close() {
        $catalog.hide();
    }
    return {
        init: init,
        open: open,
        close: close
    }
})();