(function() {

    var app = window.AURANOT = window.AURANOT || {};

    app.NoteView = Backbone.View.extend({
        className: 'noteView',
        template : _.template($('#noteViewTmpl').html()),

        initialize: function() {
        },

        render: function() {
            var self = this;

            this.$el.append(this.template(this.model.attributes));

            this.$('.location').on('click', function() {
                $(this).toggleClass('active');
            });

            this.$('.edit').on('click', function() {
                self.trigger('edit');
            });

            this.$('.delete').on('click', function() {
                self.trigger('delete');
            });
        }
    });

}());