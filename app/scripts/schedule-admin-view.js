var ScheduleAdminPage = Parse.View.extend ({

  events: {
    'click .edit-profile-button'      : 'toggleEditAttribute',
    'click .save-profile-edit-button' : 'saveProfileEdit',
  },

  template: _.template($('.schedule-admin-container-template').text()),

    initialize: function() {
      if((Parse.User.current() === null) === true){
        router.navigate('#',{trigger:true})
      } else {
        $("html, body").scrollTop(0);
        $('.template-container').html(this.$el)
        this.$el.html(this.template());
        $('.template-container').css('padding-top', '80px');
        this.render();
        // this.getLocations();
      }
    },

    render: function() {
      $('.create-locations-container').append(this.template());
    },

    toggleEditAttribute: function(){
      if($(event.target).hasClass('active')){
        _.each($('.profile-edit'), function(){
          $('.profile-edit').prop('disabled', 'disabled');
        })
        $(event.target).removeClass('active');
      }else {
        _.each($('.profile-edit'), function(){
          $('.profile-edit').prop('disabled', false);
        })
        $(event.target).addClass('active');
      }
    },

    saveProfileEdit: function () {
      var that = this;
      var text = $('.schedule-body-textarea').val();
      text = text.replace(/\r?\n/g, '<br/>');
      Parse.User.current().set({
        scheduleTitle:   ($('.schedule-title-input').val().length != 0 ? $('.schedule-title-input').val() : Parse.User.current().get('scheduleTitle')),
        ScheduleBody:    ($('.schedule-body-textarea').val().trim().length != 0 ? $('.schedule-body-textarea').val() : Parse.User.current().get('scheduleBody')),
      }).save();
      $('.edit-profile-button').click();
      $('.profile-edit').val('');
      $('.schedule-body-textarea').prop('placeholder', Parse.User.current().get('scheduleBody')),
      $('.schedule-title-input').prop('placeholder', Parse.User.current().get('scheduleTitle'))
    },

});