(function() {
    var app = window.AURANOT = window.AURANOT || { };
    
    // This file overrides Backbone's sync method to create a simulated backend that
    // uses the browser's local storage. It's a quick and easy way to create a backend
    // that works for the purposes of this demo.

    /*************************************************************************/

    Backbone.sync = function(method, model, options) {
        var ret = null;

        if (model.url == 'notes') {
            if (method == 'read') {
                ret = [ ];
                $.each(window.localStorage, function(key, val) {
                    if (key.indexOf('note-') == 0) {
                        var model = new app.Note(JSON.parse(val));
                        model.id = key;
                        ret.push(model);
                    }
                });
            }
        }

        else if (model.url = "note") {
            switch (method) {
                case 'create':
                case 'update':
                    if (method == 'create')
                        model.id = 'note-' + guid();
                    ret = window.localStorage[model.id] = JSON.stringify(model);
                    break;
                case 'read':
                    ret = JSON.parse(window.localStorage[model.id]);
                    break;
                case 'delete':
                    ret = JSON.parse(window.localStorage[model.id]);
                    delete window.localStorage[model.id];
                    break;
            }
        }

        if (ret && options.success)
            options.success(ret);
        else if (!ret && options.error)
            options.error('error');
        return ret;
    };

    /*************************************************************************/

    // Good-enough GUID generation. From http://documentcloud.github.io/backbone/docs/backbone-localstorage.html
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    function guid() {
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    };

}());