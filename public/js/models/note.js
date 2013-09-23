(function() {

    var app = window.AURANOT = window.AURANOT || { };

    app.Note = Backbone.Model.extend({
        defaults: {
            title: '',
            text: '',
            location: null,
            modifiedDate: (new Date()).getTime()
        }
    });

}());