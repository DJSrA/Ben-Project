var FooterView = Parse.View.extend ({

  el: $('.footer-template-container'),

  events: {

  },

  template: _.template($('.footer-template').text()),

  initialize: function() {
    var that = this;
    console.log('footer is here');
    // this.router = options.router; 
    $('.footer-template-container').html(this.$el)
    this.$el.html(this.template());
  },

});