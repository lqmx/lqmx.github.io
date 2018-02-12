requirejs.config({
    waitSeconds : 30,
    urlArgs: "v" + (new Date()).getTime(),
    baseUrl: '../../dep',
    paths: {
        // app: '../../js'
    }
});

