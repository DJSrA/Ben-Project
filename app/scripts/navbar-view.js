var NavbarView = Parse.View.extend ({

  el: $('.nav-template-container'),

  events: {

  },

  homeTemplate: _.template($('.landing-page-template').text()),
  template: _.template($('.navbar-template').text()),

  initialize: function(options) {
    var that = this;
    this.router = options.router; 
    $('.nav-template-container').html(this.$el)
    this.$el.html(this.template());
  },

});