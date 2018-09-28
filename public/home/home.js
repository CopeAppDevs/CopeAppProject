app.config(function($stateProvider){
	$stateProvider.state("home", {
		url:"/home",
		templateUrl:"home/home.html"
	})
});
app.controller("HomeCtrl", HomeCtrl);
function HomeCtrl($scope){
	
}