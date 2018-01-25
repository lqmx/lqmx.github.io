$(function () {
    var htmlDir = "/data/html/";
    var winHeight =$(document).height(), winWidth = $(document).width();
    var timer=null, second = 0;
    var Drag = {
        isDrag: false,
        offsetX: 0,
        offsetY: 0,
        dragDiv: null,
        containerW: window.innerWidth,
        containerH: window.innerHeight,
        divDrop: function(){
            $(window).off('mousemove');
            Drag.dragDiv.css({'cursor': 'pointer'});
            Drag.isDrag = false;
        },
        divGrab: function(e){
            Drag.isDrag = true;
            Drag.dragDiv = $(this);
            Drag.offsetX = e.clientX - Drag.dragDiv[0].offsetLeft;
            Drag.offsetY = e.clientY - Drag.dragDiv[0].offsetTop;
            $(this).css({'z-index': 2,'cursor': 'move'}).siblings().css({'z-index': 1});
            $(window).mousemove(Drag.divMove);
            $(window).mouseup(Drag.divDrop);
        },
        divMove: function(e){
            this.aX = e.clientX - Drag.offsetX;
            this.aY = e.clientY - Drag.offsetY;
            if (this.aX < 0) {
                this.aX = 0;
            }
            if (this.aY < 0) {
                this.aY = 0;
            }
            if (this.aX > Drag.containerW-Drag.dragDiv[0].offsetWidth) {
                this.aX = Drag.containerW-Drag.dragDiv.offsetWidth;
            }
            if (this.aY > Drag.containerH-Drag.dragDiv[0].offsetHeight) {
                this.aY = Drag.containerH-Drag.dragDiv[0].offsetHeight;
            }
            Drag.dragDiv.css('top', this.aY + 'px');
            Drag.dragDiv.css('left', this.aX + 'px');
        },
    };
    var PAPER_STATE_DRAG = 0, PAPER_STATE_CLICK = 1, paperState = PAPER_STATE_DRAG;

    $('.paper').each(function (k, v) {
        var transformStyle = "rotate(" + (Math.random()*360).toFixed(0)+ "deg)";
        $(v).hover(function () {
            timer=setInterval(function() {
                if(Drag.isDrag === true) return;
                if(++second > 0) {
                    $(v).css({transform:"rotate(0deg) scale(1.1)"});
                    paperState = PAPER_STATE_CLICK;
                }
            },1000);
        }, function () {
            $(this).css({
                transform: transformStyle,
            });
            clearInterval(timer);
            second = 0;
            paperState = PAPER_STATE_DRAG;
        });
        $(v).click(function () {
            if(paperState === PAPER_STATE_CLICK){
                window.location.href = window.location.origin + htmlDir + $(v).attr('data-url');
            }
        });
        $(v).mousedown(Drag.divGrab);
        $(v).css({
            left: (Math.random()*winWidth * 0.8).toFixed(2) + 'px',
            top: (Math.random()*winHeight * 0.8).toFixed(2) + 'px',
            transform:transformStyle
        }).show();
    });
    CmdBar.init([{
        cmd: "draw",
        des: 'show the draw board',
        handle: function () {
            var canvas = $('.draw-board');
            canvas.show();
            canvas[0].width = $(document).width();
            canvas[0].height =$(document).height();
            var ctx = canvas[0].getContext("2d");
            ctx.strokeStyle = 'red';
            canvas.show();
            canvas.mousedown(function (ev) {
                ctx.beginPath();
                ctx.moveTo(ev.clientX - this.offsetLeft, ev.clientY - this.offsetTop);
                $(document).mousemove(function (ev) {
                    ctx.lineTo(ev.clientX - canvas[0].offsetLeft, ev.clientY - canvas[0].offsetTop);
                    ctx.stroke();
                });
                $(document).mouseup(function (ev) {
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                    ctx.closePath();
                });
            });
        }
    }])
});