// BEN PROJECT SERVER_____________________
Parse.initialize("yZXbx1cs1micyuuPRbtPCaLnO8U5aJ38L40RDoA1", "el0M8ZBpgPMjBfmZvcZ5u673eeHAiWnZffpBieQy");

var router = new AppRouter();

Parse.history.start();

if(window.location.hash === "#admin"){
  $('.nav-template-container').hide()
} else if (window.location.hash === "#") {
  $('.nav-template-container').show();
}