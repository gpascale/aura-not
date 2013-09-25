(function() {

    var app = window.AURANOT = window.AURANOT || {};

    app.NoteListView = Backbone.View.extend({
        className: 'noteListView',
        template : _.template($('#noteListViewTmpl').html()),
        notes: new app.NoteCollection(), // the collection of models rendered by this view

        /**********************************************************************/

        render: function() {
            var self = this;
            this.$el.append(this.template());

            // Call _update to rerender the list whenever anything changes
            this.notes.on('change reset add remove', this._update, this);

            // Hook up to the sort order changed event
            app.appView.on('sortOrderChanged', this._sortOrderChanged, this);
            this._sortOrderChanged('newest');

            this.notes.fetch();
            
            // Show the note in the content view when the user selects one from the list
            this.$el.on('click', '.noteList li', function() {
                var model = self.notes.models[$(this).index()];
                self.trigger('noteSelected', model);
            });
        },

        /**********************************************************************/

        _update: function() {
            var self = this;
            this.$('.noteList').empty();
            var itemTemplate = _.template($('#noteListItemViewTmpl').html());
            _.each(this.notes.models, function(model) {
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