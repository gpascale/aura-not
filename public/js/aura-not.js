(function() {

    var app = window.AURANOT = window.AURANOT || { };

    $(document).ready(function() {
        var appView = new app.AppView();
        appView.render();
        $('body').append(appView.$el);
    });

}());