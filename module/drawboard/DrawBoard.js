define(['jquery'], function($) {
    return (function () {

        var self = this;
        var tpl = '<canvas class="draw-board"><span>浏览器不支持canvas</span></canvas>';
        self.$drawBoard = $('.draw-board');
        self.ctx = null;

        function init(event) {

            if (self.$drawBoard.length > 0) {
                show();
                return true;
            }

            $(document.body).append(tpl);
            self.$drawBoard = $('.draw-board');

            var canvas = self.$drawBoard[0];
            canvas.width = $(document).width();
            canvas.height = $(document).height();

            self.ctx = canvas.getContext("2d");
            self.ctx.strokeStyle = 'red';

            self.$drawBoard.mousedown(function (ev) {
                self.ctx.beginPath();
                self.ctx.moveTo(ev.clientX - this.offsetLeft, ev.clientY - this.offsetTop);
                $(document).mousemove(function (ev) {
                    self.ctx.lineTo(ev.clientX - canvas.offsetLeft, ev.clientY - canvas.offsetTop);
                    self.ctx.stroke();
                });
                $(document).mouseup(function (ev) {
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                    self.ctx.closePath();
                });
            });
            event();
            show();
        }

        function show() {
            self.$drawBoard.addClass('cursor-pen').show();
        }

        function hide() {
            var canvas = self.$drawBoard[0];
            self.ctx.clearRect(0, 0, canvas.width, canvas.height);
            self.$drawBoard.removeClass('cursor-pen').hide();
        }

        return {
            init: init,
            show: show,
            hide: hide
        };
    })();
});