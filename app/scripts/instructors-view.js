var InstructorsView = Parse.View.extend ({

  events: {
  },

  template: _.template($('.instructors-page-template').text()),
  instructorsInstanceTemplate: _.template($('.instructors-instance-template').text()),


  initialize: function() {
    console.log('instructors view');
    var that = this;
    $("html, body").scrollTop(0);
    $('.template-container').html(this.$el)
    this.$el.html(this.template());
    this.getInstructors();

  },

  getInstructors: function () {
    var that = this;
    var query = new Parse.Query('instructorInstance');
    query.limit(1500);
    query.find({
      success: function(instructor){
        console.log(instructor[0].attributes.instructorImage._url)
        for(i=0;i<instructor.length;i++){
          $('.instructors-template-list-container').append(that.instructorsInstanceTemplate({
            instructorName: instructor[i].attributes.instructorName,
            instructorTagline: instructor[i].attributes.instructorTagline,
            instructorBio: instructor[i].attributes.instructorBio,
            instructorImage: instructor[i].attributes.instructorImage._url
          }));
        }
      },

      error: function(error) {
        console.log('threw an error');
      }
    })
  },
});