(function() {

    var app = window.AURANOT = window.AURANOT || {};

    /******************************************************************************/
    /* A view which allows the user to edit an existing note or create a new one  */
    /******************************************************************************/
    app.NoteEditView = Backbone.View.extend({
        className: 'noteEditView',
        template: _.template($('#noteEditViewTmpl').html()),

        render: function() {
            var self = this;

            this.$el.append(this.template(this.model.attributes));            

            /**********************************************************************/

            this.$el.on('click', '.location', function() {
                $(this).toggleClass('active');
            });

            /**********************************************************************/

            this.$('.btn.setLocation').on('click', function() {
                if (navigator.geolocation) {
                    var $btn = $(this);
                    $btn.text("Getting Location");
                    $btn.prop('disabled', true);
                    navigator.geolocation.getCurrentPosition(function(position) {
                        self.model.set('location', {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                        $btn.replaceWith('<p class="setLocation">' + position.coords.latitude + ', ' + position.coords.longitude + '</p>');
                    }, function() {
                        alert("Failed to read your location. Try again.")
                        $btn.prop('disabled', false);
                        $btn.text("Set Location");
                    });
                }
                else {
                    alert("Your browser doesn't support geolocation.")
                }
            });

            /**********************************************************************/

            this.$('.btn.cancel').on('click', function() {
                self.trigger('cancel');
            });

            /**********************************************************************/

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