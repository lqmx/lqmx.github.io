var Key = function (name, str, fn) {
    var key = {
        name: name,
        key: '',
        shift: false,
        ctrl: false,
        alt:  false,
        fn: fn
    };
    var arr = str.split('-');
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] === 'Ctrl') {
            key.ctrl = true;
        }
        else if(arr[i] === 'Shift') {
            key.shift = true;
        }
        else if (arr[i] === 'Alt'){
            key.alt = true;
        } else {
            key.key = arr[i].toLowerCase();
        }
    }
    return key;
};

var KeyBoard = (function () {

    var self = this;
    var keys = {};

    function bind(key) {
        if(keys[key.name] === void 666) {
            keys[key.name] = key;
        }
    }

    function listen() {
        $(document).keydown(function(event){
            $.each(keys, function (k, v) {
                var key = new Key(v.name, v.key, v.fn);
                var ctrl, shift, alt;
                ctrl = key.ctrl?event.ctrlKey:true;
                shift = key.shift?event.shiftKey:true;
                alt = key.alt?event.altKey:true;
                if(event.target === document.body
                    && event.key === key.key
                    && ctrl && shift &&alt){
                    v.fn();
                }
            });
        });
    }

    return {
        bind: bind,
        listen: listen
    }

})();