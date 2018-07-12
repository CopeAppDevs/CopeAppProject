app.config(function($stateProvider){
	$stateProvider.state("interrogazioni", {
		url:"/interrogazioni",
		templateUrl:"interrogazioni/interrogazioni.html"
	})
});
app.controller("InterrogazioniCtrl", InterrogazioniCtrl);
function InterrogazioniCtrl($scope){
	
	$scope.events = [{
			date: new Date(1529432645),
			description: "Domani"
	}, {
		date: new Date(1529519045),
		description: "Dopodomani"
	}]
	
	$scope.openEvent = function(index) {
		//open dialog for the event with this index
	}
}