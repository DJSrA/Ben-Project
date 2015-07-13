var LandingPage = Parse.View.extend ({

  events: {
    // 'click .about-page-link': 'routeAbout'
  },

  template: _.template($('.landing-page-template').text()),

  initialize: function() {
    var that = this;
    $('.template-container').html(this.$el)
    this.$el.html(this.template());
    $('.home-nav').prop('disabled', true);
  },

});