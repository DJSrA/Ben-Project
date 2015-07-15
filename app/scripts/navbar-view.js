var NavbarView = Parse.View.extend ({

  el: $('.nav-template-container'),

  events: {
    "click .contact-us": 'contactUs',
    "click .about": 'scrollAbout',
    "click .home": 'scrollHome'
  },

  homeTemplate: _.template($('.landing-page-template').text()),
  template: _.template($('.navbar-template').text()),

  initialize: function(options) {
    var that = this;
    this.router = options.router; 
    $('.nav-template-container').html(this.$el)
    this.$el.html(this.template());
    // this.fillCompanyInfo();
    this.getShopInfo()
  },

  getShopInfo: function(){
    var that = this;
    var query = new Parse.Query('shopInstance');
    query.limit(1500);
    query.find({
      success: function(shop){
        console.log(shop[0].attributes.logo._url);
        // if(shop.logo){
          $('.brand-logo-img').css('background', 'url(' + shop[0].attributes.logo._url + ') no-repeat center').css('background-size', '100%');
        // }
      },
      error: function(error) {
        console.log('No shop found. Using Defaults.');
      }
    })
  },

  contactUs: function () {
    $('html,body').animate({
      scrollTop: $(".footer").offset().top
    },200);
  },

  scrollAbout: function () {
    $('html,body').animate({
      scrollTop: $(".about-us").offset().top
    },200);
  },

  scrollHome: function() {
    $('html, body').animate({scrollTop:0}, 200);
  },

  // fillCompanyInfo: function () {
  //   var that = this;
  //   var query = new Parse.Query('user');
  //   query.limit(1500);
  //   query.find({
  //     success: function(user){
  //       $('.brand-logo-img').css('background', 'url("' + Parse.User.current().get('logo')._url + '") no-repeat center').css('background-size', '100%');
  //     },

  //     error: function(error){
  //       console.log(error + " it failed");
  //     }
  //   })
  // }

});