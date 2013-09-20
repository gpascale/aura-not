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
                { title: "Note 1", text: "This is note 1" },
                { title: "Note 2", text: "This is note 2" },
                { title: "Note 3", text: "This is note 3" }
            ];
            
            _.each(notes, function(item) {
                var next = $(itemTemplate(item));
                self.$el.append(next);  
            });
        }
    });

}());