var Drag = (function () {

        var PAPER_STATE_DRAG = 0, PAPER_STATE_CLICK = 1;

        var self = this;
        self.isDrag = false;
        self.offsetX = 0;
        self.offsetY = 0;
        self.dragDiv = null;
        self.containerW = window.innerWidth;
        self.containerH = window.innerHeight;
        self.target = null;

        function divDrop() {
            $(window).off('mousemove');
            self.dragDiv.css({'cursor': 'pointer'});
            self.isDrag = false;
            self.target.css({'z-index': 1});
        }

        function divGrab(e) {
            self.isDrag = true;
            self.dragDiv = $(this);
            self.offsetX = e.clientX - self.dragDiv[0].offsetLeft;
            self.offsetY = e.clientY - self.dragDiv[0].offsetTop;
            $(this).css({'z-index': 2, 'cursor': 'move'});
            self.target = $(this);
            $(window).mousemove(divMove);
            $(window).mouseup(divDrop);
        }

        function divMove(e) {
            this.aX = e.clientX - self.offsetX;
            this.aY = e.clientY - self.offsetY;
            if (this.aX < 0) {
                this.aX = 0;
            }
            if (this.aY < 0) {
                this.aY = 0;
            }
            if (this.aX > self.containerW - self.dragDiv[0].offsetWidth) {
                this.aX = self.containerW - self.dragDiv.offsetWidth;
            }
            if (this.aY > self.containerH - self.dragDiv[0].offsetHeight) {
                this.aY = self.containerH - self.dragDiv[0].offsetHeight;
            }
            self.dragDiv.css('top', this.aY + 'px');
            self.dragDiv.css('left', this.aX + 'px');
        }

        function bind($el) {
            $el.mousedown(divGrab);
        }

        return {
            PAPER_STATE_DRAG: PAPER_STATE_DRAG,
            PAPER_STATE_CLICK: PAPER_STATE_CLICK,
            isDrag: self.isDrag,
            bind: bind
        };
    })();
