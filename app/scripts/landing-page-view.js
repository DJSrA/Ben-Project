var LandingPage = Parse.View.extend ({

  events: {
  },

  template: _.template($('.landing-page-template').text()),

  initialize: function(options) {
    var that = this;
    this.router = options.router; 
    $('.template-container').html(this.$el)
    this.$el.html(this.template());
    this.render();
  },

  render: function() {
  },

});

// for now this should just be an alan arms logo and some buttons to take the user to the other pages
