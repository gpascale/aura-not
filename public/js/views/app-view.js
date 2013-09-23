(function() {

    var app = window.AURANOT = window.AURANOT || {};

    app.AppView = Backbone.View.extend({
        className: 'appView',
        template : _.template($('#appViewTmpl').html()),

        render: function() {
            var self = this;

            this.$el.append(this.template());

            var noteModel = new app.Note({
                title: 'My Note',
                text: 'Hello, this is my note',
                modifiedDate: (new Date()).getTime()
            });
            this._showNote(noteModel);

            this.noteListView = new app.NoteListView();
            this.noteListView.render();
            this.noteListView.on('noteSelected', function(noteModel) {
                self._showNote(noteModel);
            });
            this.$('.sidebarContainer').append(this.noteListView.$el);

            // Create note button
            this.$('.createNote').on('click', function(e) {
                self._createNote();
            });
        },

        _showNote: function(noteModel) {
            var self = this;
            var noteView = new app.NoteView({ model: noteModel });
            noteView.render();
            noteView.on('edit', function() {
                // destroy noteView here
                self._editNote(noteModel);
            });
            noteView.on('delete', function() {
                console.log("DELETE");
            });
            this.$('.contentContainer').empty();
            this.$('.contentContainer').append(noteView.$el);
        },

        _editNote: function(noteModel) {
            var self = this;
            var noteEditView = new app.NoteEditView({ model: noteModel });
            noteEditView.render();
            noteEditView.on('cancel', function() {
                // destroy note edit view
                self._showNote(noteModel);
            });
            noteEditView.on('save', function() {
                // destroy note edit view
                // todo: save changes
                self._showNote(noteModel);
            });
            this.$('.contentContainer').empty();
            this.$('.contentContainer').append(noteEditView.$el);
        },

        _createNote: function() {
            var noteModel = new app.Note();
            var noteEditView = new app.NoteEditView({ model: noteModel });
            noteEditView.render();
            this.$('.contentContainer').empty();
            this.$('.contentContainer').append(noteEditView.$el);
        }
    });

}());