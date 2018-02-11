define(function () {
    return function (str, detail) {
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
});