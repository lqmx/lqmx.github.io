define(['./key'], function (Key) {
    return (function () {

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
});

