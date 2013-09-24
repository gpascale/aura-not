(function() {

    var app = window.AURANOT = window.AURANOT || { };

    // Good-enough GUID generation. From http://documentcloud.github.io/backbone/docs/backbone-localstorage.html
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    function guid() {
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    };

    app.Note = Backbone.Model.extend({
        defaults: {
            title: '',
            text: '',
            location: null,
            modifiedDate: (new Date()).getTime()
        },

        sync: function(method, model, options) {
            console.log("SYNC: method is " + method);
            var ret = null;

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

            if (ret && options.success)
                options.success(ret);
            else if (!ret && options.error)
                options.error(ret);

            return null;
        }
    });

}());