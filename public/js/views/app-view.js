(function() {

    var app = window.AURANOT = window.AURANOT || {};

    app.AppView = Backbone.View.extend({
        className: 'appView',
        template : _.template($('#appViewTmpl').html()),

        render: function() {
            var self = this;

            this.notes = new app.NoteCollection();
            this.notes.fetch();

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
                noteModel.destroy({ success: function() {
                    self._createNote();
                }});
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
                noteModel.save({ }, { success: function() {
                    self._showNote(noteModel);
                    self.noteListView.notes.set(noteModel, { remove: false });
                }});
            });
            this.$('.contentContainer').empty();
            this.$('.contentContainer').append(noteEditView.$el);
        },

        _createNote: function() {
            this._editNote(new app.Note());
        }
    });

}());