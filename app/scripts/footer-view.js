var FooterView = Parse.View.extend ({

  el: $('.footer-template-container'),

  events: {
    'click #submit-message': 'sendEmail'
  },

  template: _.template($('.footer-template').text()),

  initialize: function() {
    var that = this;
    console.log('footer is here');
    $('.footer-template-container').html(this.$el)
    this.$el.html(this.template());
  },

  sendEmail: function() {
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'b6t3hTJ_NEL7lz8ulPoHuQ',
        'message': {
          'from_email': $('#email-input').val(),
          'to': [
              {
                'email': 'daniel.jeffords@gmail.com',
                'name': 'Mister Fister\'s help desk ' + $('#name-input').val(),
                'type': 'to'
              }
            ],
          'autotext': 'true',
          'subject': 'Mister Fister\'s',
          'html': $('#message-input').val()
        }
      }
     }).done(function(response) {
      console.log($('#email-input').val())
       console.log(response); // if you're into that sorta thing
     });
     this.emailResponse();
  },

  emailResponse: function() {
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'b6t3hTJ_NEL7lz8ulPoHuQ',
        'message': {
          'from_email': 'daniel.jeffords@gmail.com',
          'to': [
              {
                'email': $('#email-input').val(),
                'name': 'Mister Fister\'s help desk ' + $('#name-input').val(),
                'type': 'to'
              }
            ],
          'autotext': 'true',
          'subject': 'Mister Fister\'s - Thank you for contacting us!',
          'html': '<h1>Thank you for your email!</h1><br/><br/><p> We\'ll get back with you as soon as possible!</p><br/><br/>' + $('#message-input').val() 
        }
      }
     }).done(function(response) {
      console.log($('#email-input').val())
       console.log(response); // if you're into that sorta thing
     });
  }

});