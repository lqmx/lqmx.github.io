var Key = function (str, detail) {
    var key = {
        key: '',
        shift: false,
        ctrl: false,
        alt:  false,
        target: detail.target,
        fn: detail.fn
    };
    var arr = str.split('-');
    for(var i = 0; i < arr.length; i++) {
        var v = arr[i].toLowerCase();
        switch (v){
            case 'ctrl':
            case 'shift':
            case 'alt':
                key[v] = true;
                break;
            default:
                key.key = v;
        }
    }
    return key;
};

var KeyBoard = (function () {

    var self = this;
    var keys = {};

    function bind(key, fn, target) {
        if(keys[key] === void 666) {
            keys[key] = {
                fn: [],
                target: target === void 666 ? document.body : target
            };
        }
        keys[key].fn.push(fn);
    }

    function listen() {
        $(document).keydown(function(event){
            $.each(keys, function (k, v) {
                var key = new Key(k, v);
                var ctrl, shift, alt;
                ctrl = key.ctrl?event.ctrlKey:true;
                shift = key.shift?event.shiftKey:true;
                alt = key.alt?event.altKey:true;
                if(
                    event.target === key.target
                    && event.key.toLowerCase() === key.key
                    && ctrl && shift && alt
                ){
                    for(var i =0; i < key.fn.length; i ++) key.fn[i]();
                }
            });
        });
    }

    return {
        bind: bind,
        listen: listen
    }

})();