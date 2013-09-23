(function() {

    var app = window.AURANOT = window.AURANOT || {};

    app.NoteListView = Backbone.View.extend({
        className: 'noteListView',
        template : _.template($('#noteListViewTmpl').html()),

        render: function() {
            var self = this;
            this.$el.append(this.template());

            var itemTemplate = _.template($('#noteListItemViewTmpl').html());
            var notes = [
                { title: "Note 1", text: "This is note 1", modifiedDate: (new Date()).getTime() },
                { title: "Note 2", text: "This is note 2", modifiedDate: (new Date()).getTime() },
                { title: "Note 3", text: "This is note 3", modifiedDate: (new Date()).getTime() }
            ];
            
            _.each(notes, function(item) {
                var next = $('<li></li>').append($(itemTemplate(item)));
                self.$('.noteList').append(next);
            });

            this.$el.on('click', '.noteList li', function() {
                var model = new app.Note(notes[$(this).index()]);
                self.trigger('noteSelected', model);
            });
        }
    });

}());