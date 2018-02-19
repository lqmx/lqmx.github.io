var Drag = (function () {

    var DRAG_STATUS = {
        NO_DRAG: 1,
        WILL_DRAG: 2,
        DRAGING: 3,
        DRAGED: 4
    };

    var self = this;
    self.dragStatus = DRAG_STATUS.NO_DRAG;
    self.offsetX = 0;
    self.offsetY = 0;
    self.dragDiv = null;
    self.containerW = window.innerWidth;
    self.containerH = window.innerHeight;
    self.target = null;
    self.hasMoving = false;

    function divDrop() {
        $(window).off('mousemove');
        self.dragDiv.css({'cursor': 'pointer'});
        self.dragStatus = DRAG_STATUS.DRAGED;
        self.target.css({'z-index': 1});
    }

    function divGrab(e) {
        self.dragDiv = $(this);
        self.offsetX = e.clientX - self.dragDiv[0].offsetLeft;
        self.offsetY = e.clientY - self.dragDiv[0].offsetTop;

        $(this).css({'z-index': 233, 'cursor': 'move'});

        self.dragStatus = DRAG_STATUS.WILL_DRAG;
        self.target = $(this);

        self.hasMoving = false;

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

        self.dragStatus = DRAG_STATUS.DRAGING;
        self.hasMoving = true;

    }

    function bind($el) {
        $el.mousedown(divGrab);
    }

    function getDragStatus() {
        return self.dragStatus;
    }

    function hasMoving() {
        return self.hasMoving;
    }

    return {
        DRAG_STATUS: DRAG_STATUS,
        hasMoving: hasMoving,
        getDragStatus: getDragStatus,
        bind: bind
    };
})();
