var CoursesAdminPage = Parse.View.extend ({

  events: {
    'click .edit-profile-button'      : 'toggleEditAttribute',
    'click .save-profile-edit-button' : 'saveProfileEdit',
    'change #myFile'              : 'readURL',
    'click .add-course'           : 'addCourse',
    'click .cancel-add'           : 'cancelAddCourse'
  },

  template: _.template($('.courses-admin-template').text()),
  detailTemplate: _.template($('.course-detail-template').text()),
  courseInstanceTemplate: _.template($('.course-instance-template').text()),


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
        if(Parse.User.current().get('logo')){
          console.log(Parse.User.current().get('logo')._url);
          $('#logo-img').attr('src', Parse.User.current().get('logo')._url);
        }
        this.readURL;
        this.getCourses();
      }
    },

    render: function() {
    },

    getCourses: function () {
      var that = this;
      var query = new Parse.Query('courseInstance');
      query.limit(1500);
      query.find({
        success: function(course){
          for(i=0;i<course.length;i++){
            $('.courses-list-container').prepend(that.courseInstanceTemplate({
              courseTitle: course[i].attributes.courseTitle,
              courseInstructor: course[i].attributes.courseInstructor,
              courseDescription: course[i].attributes.courseDescription,
              courseImage: course[i].attributes.logo._url
            }));
          }
        },

        error: function(error) {
          console.log('threw an error');
        }
      })
    },

    readURL: function(){
      console.log($('#myFile')[0]);
      var x = document.getElementById("myFile");
      var txt = "";
      if ('files' in x) {
        var Reader = new FileReader();
        Reader.readAsDataURL(x.files[0]);

        Reader.onload = function (Event) {
            document.getElementById("logo-img").src = Event.target.result;
        };
      } 
      else {
          if (x.value == "") {
              txt += "Select one or more files.";
          } else {
              txt += "The files property is not supported by your browser!";
              txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
          }
      }
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

      var CourseInstance = Parse.Object.extend("courseInstance");
      var courseInstance = new CourseInstance();

      var photoUpload = function() {
        //original photo upload function

        var fileUploadControl = $("#myFile")[0];
        if (fileUploadControl.files.length > 0) {
          var file = fileUploadControl.files[0];
          var name = "photo.jpg";
         
          return new Parse.File(name, file);
        } 
        // else if (fileUploadControl.files.length === 0) {
        //   return Parse.User.current().get('photo');
        // };
      }
      courseInstance.set({
        courseTitle:      ($('.course-title-input').val().length != 0 ? $('.course-title-input').val() : Parse.User.current().get('courseTitle')),
        courseInstructor:        ($('.course-instructor-input').val().length != 0 ? $('.course-instructor-input').val() : Parse.User.current().get('courseInstructor')),
        courseDescription:    ($('.course-description-textarea').val().trim().length != 0 ? $('.course-description-textarea').val() : Parse.User.current().get('courseDescription')),
        logo:         (photoUpload() != undefined ? photoUpload() : Parse.User.current().get('logo')),
      }).save();
      console.log(photoUpload());
      $('.edit-profile-button').click();
      $('.profile-edit').val('');
      $('.course-title-input').prop('placeholder', Parse.User.current().get('courseTitle')),
      $('.course-instructor-input').prop('placeholder', Parse.User.current().get('courseInstructor'))
      $('.course-description-textarea').prop('placeholder', Parse.User.current().get('courseDescription'))
    },

    addCourse: function(){
      $('.add-course').text('CANCEL').addClass('cancel-add').removeClass('add-course')
      $('.course-add-container').prepend(this.detailTemplate);
      this.toggleEditAttribute();
    },

    cancelAddCourse: function() {
      $('.cancel-add').text('ADD +').addClass('add-course').removeClass('cancel-add')
      $('.course-add-container').html('')
      this.toggleEditAttribute();
      $("html, body").scrollTop(0);
    }

});