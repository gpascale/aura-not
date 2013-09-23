(function() {

    var app = window.AURANOT = window.AURANOT || {};

    app.NoteEditView = Backbone.View.extend({
        className: 'noteEditView',
        template : _.template($('#noteEditViewTmpl').html()),

        initialize: function() {
        },

        render: function() {
            var self = this;

            this.$el.append(this.template(this.model.attributes));

            this.$('.btn.cancel').on('click', function() {
                self.trigger('cancel');
            });

            this.$('.btn.save').on('click', function() {
                self.trigger('save')
            });
        }
    });

}());