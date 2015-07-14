var AboutAdminPage = Parse.View.extend ({

  events: {
    'click .edit-profile-button'      : 'toggleEditAttribute',
    'click .save-profile-edit-button' : 'saveProfileEdit',
  },

  template: _.template($('.about-admin-template').text()),


    initialize: function() {
      if((Parse.User.current() === null) === true){
        router.navigate('#',{trigger:true})
      } else {
        $("html, body").scrollTop(0);
        $('.template-container').html(this.$el)
        this.$el.html(this.template());
        // var thisLocation = window.location.hash.substring(1).toString();
        // _.each($('.nav-link'), function(e){if(e.id == thisLocation){$(e).css('color','#ffffff')}else{$(e).css('color', '#9d9d9d')}});
        this.render();
      }
    },

    render: function() {
    },

    toggleEditAttribute: function(){
      if($(event.target).hasClass('active')){
        _.each($('.profile-edit'), function(){
          $('.profile-edit').prop('disabled', 'disabled');
        })
        // $('.save-profile-edit-button').css('opacity', 0);
        $(event.target).removeClass('active');
      }else {
        _.each($('.profile-edit'), function(){
          $('.profile-edit').prop('disabled', false);
        })
        // $('.save-profile-edit-button').css('opacity', 1);
        $(event.target).addClass('active');
      }
    },

    saveProfileEdit: function () {
      var that = this;
      Parse.User.current().set({
        aboutTitle:   ($('.about-title-input').val().length != 0 ? $('.about-title-input').val() : Parse.User.current().get('aboutTitle')),
        aboutBody:    ($('.about-body-textarea').val().trim().length != 0 ? $('.about-body-textarea').val() : Parse.User.current().get('aboutBody')),
      }).save();
      $('.edit-profile-button').click();
      $('.profile-edit').val('');
      $('.about-body-textarea').prop('placeholder', Parse.User.current().get('aboutBody')),
      $('.about-title-input').prop('placeholder', Parse.User.current().get('aboutTitle'))
    },

});