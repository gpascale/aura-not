(function() {

    var app = window.AURANOT = window.AURANOT || {};

    app.AppView = Backbone.View.extend({
        className: 'appView',
        template : _.template($('#appViewTmpl').html()),

        render: function() {
            this.$el.append(this.template());

            this.noteView = new app.NoteView();
            this.noteView.render();
            this.$('.contentContainer').append(this.noteView.$el);

            this.noteListView = new app.NoteListView();
            this.noteListView.render();
            this.$('.sidebarContainer').append(this.noteListView.$el);
        }
    });

}());