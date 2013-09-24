(function() {

    var app = window.AURANOT = window.AURANOT || {};

    app.NoteEditView = Backbone.View.extend({
        className: 'noteEditView',
        template: _.template($('#noteEditViewTmpl').html()),

        initialize: function() {},

        render: function() {
            var self = this;

            this.$el.append(this.template(this.model.attributes));

            var gettingLocation = false;

            this.$el.on('click', '.location', function() {
                $(this).toggleClass('active');
            });

            this.$('.btn.setLocation').on('click', function() {
                if (gettingLocation)
                    return;
                if (navigator.geolocation) {
                    fetchingLocation = true;
                    var $btn = $(this);
                    $btn.text("Getting Location");
                    navigator.geolocation.getCurrentPosition(function(position) {
                        self.model.set('location', {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                        gettingLocation = false;
                        $btn.replaceWith('<p class="setLocation">' + position.coords.latitude + ', ' + position.coords.longitude + '</p>');
                    }, function() {
                        alert("Failed to read your location. Try again.")
                        gettingLocation = false;
                        $btn.text("Set Location");
                    });
                }
                else {
                    alert("Your browser doesn't support geolocation.")
                }
            });

            this.$('.btn.cancel').on('click', function() {
                self.trigger('cancel');
            });

            this.$('.btn.save').on('click', function() {
                self.model.set({
                    title: self.$('.header input').val(),
                    text: self.$('.noteInputWrapper textarea').val(),
                    modifiedDate: (new Date()).getTime(),
                })
                self.trigger('save');
            });
        }
    });

}());