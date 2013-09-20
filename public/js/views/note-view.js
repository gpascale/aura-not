(function() {

    var app = window.AURANOT = window.AURANOT || {};

    app.NoteView = Backbone.View.extend({
        className: 'noteView',
        template : _.template($('#noteViewTmpl').html()),

        render: function() {
            this.$el.append(this.template());
        }
    });

}());