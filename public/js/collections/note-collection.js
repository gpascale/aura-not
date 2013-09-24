(function() {

    var app = window.AURANOT = window.AURANOT || { };

    // A collection of note models. The app maintains one of these to back the list of
    // notes in the sidebar.
    app.NoteCollection = Backbone.Collection.extend({
        model: app.Note,

        sync: function(method, collection, options) {
            if (method == 'read') {
                var ret = [ ];
                $.each(window.localStorage, function(key, val) {
                    var model = new app.Note(JSON.parse(val));
                    model.id = key;
                    ret.push(model);
                });

                if (ret)
                    options.success(ret);
                else
                    options.error('error');

                return ret;
            }
        }

    });

}());