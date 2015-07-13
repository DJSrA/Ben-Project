var AboutView = Parse.View.extend ({

  events: {
  },

  template: _.template($('.about-template').text()),

  initialize: function() {
    var that = this;
    $('.template-container').html(this.$el)
    this.$el.html(this.template());
    $('.about-nav').prop('disabled', true);
  },

});