(function() {

    var app = window.AURANOT = window.AURANOT || {};

    app.NoteListItemView = Backbone.View.extend({
        className: 'noteListItemView',
        template : _.template($('#noteListItemViewTmpl').html()),

        render: function() {
            this.$el.append(this.template());
        }
    });

}());