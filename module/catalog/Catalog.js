define(['jquery'], function($) {
    return (function () {

        var catalog_tpl = '<div class="catalog"></div>';
        var self = this;

        var $catalog = $('.catalog');
        self.isShow = false;

        function init() {
            if ($catalog.length > 0) {
                show();
                return self;
            }

            $(document.body).append(catalog_tpl);
            $catalog = $('.catalog');
            $catalog.append('<dl></dl>');
            var h2Index = 0, h3Index = 0;
            $('.md').children().each(function (k, v) {
                if (v.nodeName === 'H2') {
                    $catalog.find('dl').append('<dt data-index="' + (h2Index++) + '">' + $(v).text() + '</dt>');
                }
                if (v.nodeName === 'H3') {
                    $catalog.find('dl').append('<dd data-index="' + (h3Index++) + '">' + $(v).text() + '</dd>');
                }
            });
            $catalog.find('dt').click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                var h2 = $('.md').find('h2').eq($(this).attr('data-index'));
                $("html,body").animate({scrollTop: h2.offset().top - 10}, 2);
            });
            $catalog.find('dd').click(function () {
                $(this).addClass('active').siblings().removeClass('active');
                var h3 = $('.md').find('h3').eq($(this).attr('data-index'));
                $("html,body").animate({scrollTop: h3.offset().top - 10}, 2);
            });
            return self;
        }

        function show() {
            $catalog.show();
            self.isShow = true;
            return self;
        }

        function hide() {
            $catalog.hide();
            self.isShow = false;
            return self;
        }

        function isShow() {
            return self.isShow;
        }

        return {
            isShow: isShow,
            init: init,
            show: show,
            hide: hide
        }
    })();
});