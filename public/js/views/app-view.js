(function() {

    var app = window.AURANOT = window.AURANOT || {};

    app.AppView = Backbone.View.extend({
        className: 'appView',
        template : _.template($('#appViewTmpl').html()),

        render: function() {
            var self = this;
            app.appView = this;

            // First things first, render the app's outer HTML
            this.$el.append(this.template());

            // Create a note list view, wire it up, and stick it in the sidebar.
            this.noteListView = new app.NoteListView();
            this.noteListView.render();
            this.noteListView.on('noteSelected', function(noteModel) {
                self._showNote(noteModel);
            });
            this.$('.sidebarContainer').append(this.noteListView.$el);

            // Wire up the Create Note button
            this.$('.createNote').on('click', function(e) {
                self._showCreateNote();
            });

            // Wire up the sort order dropdown
            this.$('.dropdown-menu li a').on('click', function() {
                var sortOrders = [ 'newest', 'oldest', 'a-z', 'z-a' ];
                self.trigger('sortOrderChanged', sortOrders[$(this).parent().index()]);
                $(this).parents('.btn-group').find('.selectedValue').text($(this).text() + " ");
            });

            // To start off, present the create note screen on the right side of the page.
            self._showCreateNote();
        },

        /*********************************************************************/
        /* Shows an existing note in the content section of the page.        */
        /*********************************************************************/
        _showNote: function(noteModel) {
            var self = this;

            // Create and wire up a new content view (note view in this case)
            var noteView = new app.NoteView({ model: noteModel });
            noteView.render();
            noteView.on('edit', function() {
                self._showEditNote(noteModel);
            });
            noteView.on('delete', function() {
                noteModel.destroy({ success: function() {
                    self._showCreateNote();
                }});
            });

            this._showContentView(noteView);
        },

        /*********************************************************************/
        /* Shows an existing note with edit controls in the content section  */
        /* of the page.                                                      */
        /*********************************************************************/
        _showEditNote: function(noteModel) {
            var self = this;

            // Create and wire up a new content view (note edit view in this case)
            var noteEditView = new app.NoteEditView({ model: noteModel });
            noteEditView.render();
            noteEditView.on('cancel', function() {
                if (!noteModel.isNew())
                    self._showNote(noteModel);
            });
            noteEditView.on('save', function() {
                noteModel.save({ }, { success: function() {
                    self._showNote(noteModel);
                    self.noteListView.notes.set(noteModel, { remove: false });
                }});
            });

            this._showContentView(noteEditView);
        },

        /*********************************************************************/
        /* Shows the create note controls in the content section.            */
        /* Really just the edit controls but with no existing note.          */
        /*********************************************************************/
        _showCreateNote: function() {
            this._showEditNote(new app.Note());
        },

        /*********************************************************************/
        /* Helper function to show a view as the content view. Cleans        */
        /* up the old content view if necessary                              */
        /*********************************************************************/
        _showContentView: function(view) {
            // Clean up the old content view if there was one, and stick the new one in its place.
            this.$('.contentContainer').empty();
            this.$('.contentContainer').append(view.$el);
            if (this.activeContentView)
                this.activeContentView.remove();
            this.activeContentView = view;
        }
    });

}());