var AppRouter = Parse.Router.extend({
	
	routes: {
		''										: 'landingPage',
		'about'								: 'aboutPage'
	},

	initialize: function(){
		// this is for the swap function to work
		this.navOptions = null;
		this.currentView = null;
	},

	landingPage: function() {
		this.swap( new LandingPage({router: this}) );
		new NavbarView({router: this});
		new FooterView({router: this});
	},

	aboutPage: function() {
		this.swap( new AboutView({router: this}) );
		new NavbarView({router: this});
		new FooterView({router: this});
	},

	swap: function (view) {
		// this replaces the current app-view with the new view, and gets rid of the old one and stops it from listening for events and stuff
		if (this.currentView) {this.currentView.remove()};
		this.currentView = view;
	},



});