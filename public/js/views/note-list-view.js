(function() {
    var app = window.AURANOT = window.AURANOT || {};

    app.NoteListView = Backbone.View.extend({
        className: 'noteListView',
        template : _.template($('#noteListViewTmpl').html()),
        notes: new app.NoteCollection(), // the collection of models rendered by this view
        visibleNotes: [ ], // the collection of visible notes (possibly filtered version of above)
        searchPredicate: function() { return true; },

        /**********************************************************************/

        render: function() {
            var self = this;
            this.$el.append(this.template());

            // Call _update to rerender the list whenever anything changes
            this.notes.on('change reset add remove', this._update, this);

            // Hook up to the sort order changed event
            app.appView.on('sortOrderChanged', this._sortOrderChanged, this);
            this._sortOrderChanged('newest');

            // Hook up to the search box
            this.$el.on('keyup', '.searchInput', function() {
                var re = new RegExp(self.$('.searchInput').val().toLowerCase());
                self.searchPredicate = function(note) {
                    return re.test(note.get('title').toLowerCase() + ' ' + 
                                   note.get('text').toLowerCase());
                };
                self._update();
            });

            // Show the note in the content view when the user selects one from the list
            this.$el.on('click', '.noteList li', function() {
                var model = self.visibleNotes[$(this).index()];
                self.trigger('noteSelected', model);
            });

            // Fetch the existing notes from the "server" (local storage)
            this.notes.fetch();
        },

        /**********************************************************************/

        _update: function() {
            var self = this;
            this.$('.noteList').empty();
            var itemTemplate = _.template($('#noteListItemViewTmpl').html());

            // filter the notes
            this.visibleNotes = _.filter(this.notes.models, this.searchPredicate);

            // render the filtered notes
            _.each(this.visibleNotes, function(model) {
                var next = $('<li></li>').append($(itemTemplate(model.attributes)));
                self.$('.noteList').append(next);
            });
        },

        /**********************************************************************/

        _sortOrderChanged: function(sortOrder) {
            switch(sortOrder) {
                case 'newest':
                    this.notes.comparator = function(obj) {
                        return -obj.get('modifiedDate');
                    };
                    break;
                case 'oldest':
                    this.notes.comparator = function(obj) {
                        return obj.get('modifiedDate');
                    };
                    break;
                case 'a-z':
                    this.notes.comparator = function(lhs, rhs) {
                        return lhs.get('title').localeCompare(rhs.get('title'));
                    };
                    break;
                case 'z-a':
                    this.notes.comparator = function(lhs, rhs) {
                        return rhs.get('title').localeCompare(lhs.get('title'));
                    }
                    break;
            }
            this.notes.sort();
            this._update();
        }
    });
}());