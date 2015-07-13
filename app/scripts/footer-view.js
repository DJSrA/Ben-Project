var FooterView = Parse.View.extend ({

  el: $('.footer-template-container'),

  events: {

  },

  template: _.template($('.footer-template-container').text()),

  initialize: function(options) {
    var that = this;
    this.router = options.router; 
    $('.footer-template-container').html(this.$el)
    this.$el.html(this.template());
  },

});