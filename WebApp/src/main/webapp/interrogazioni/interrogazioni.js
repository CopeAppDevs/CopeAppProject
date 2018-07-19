app.config(function($stateProvider){
	$stateProvider.state("interrogazioni", {
		url:"/interrogazioni",
		templateUrl:"interrogazioni/interrogazioni.html"
	})
});
app.controller("InterrogazioniCtrl", InterrogazioniCtrl);
function InterrogazioniCtrl($scope, $moment, $anchorScroll){
	$scope.mode = "dafys";
	
	$scope.events = [{
			eventDate: new Date(1532025814925),
			description: "Domani",
			color: 'yellow'
	}, 
		{
		eventDate: new Date(1532025814925),
		description: "Ungu",
		color: 'lightblue'
	}, {
		eventDate: new Date(1532325814925),
		description: "Dopodomani",
		color: 'lightgreen'
	}]
	
	$scope.openEvent = function(index) {
		//open dialog for the event with this index
	}
}