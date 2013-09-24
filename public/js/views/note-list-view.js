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

            this.notes.on('change reset add remove', function() {
                self._update();
            })
            this.notes.fetch();
            
            this.$el.on('click', '.noteList li', function() {
                var model = self.notes.models[$(this).index()];
                self.trigger('noteSelected', model);
            });
        },

        /**********************************************************************/

        _update: function() {
            // When data has changed, just rerender the entire list.
            var self = this;
            this.$('.noteList').empty();
            var itemTemplate = _.template($('#noteListItemViewTmpl').html());
            _.each(this.notes.models, function(model) {
                var next = $('<li></li>').append($(itemTemplate(model.attributes)));
                self.$('.noteList').append(next);
            });
        }
    });

}());