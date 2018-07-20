app.config(function($stateProvider){
	$stateProvider.state("interrogazioni", {
		url:"/interrogazioni",
		templateUrl:"interrogazioni/interrogazioni.html"
	})
});
app.controller("InterrogazioniCtrl", InterrogazioniCtrl);
function InterrogazioniCtrl($scope, $moment, $anchorScroll, $mdDialog){
	$scope.mode = "dafys";
	
	$scope.events = [{
			eventDate: new Date(1532025814925),
			description: "one",
			color: 'yellow'
	}, 
		{
		eventDate: new Date(1532025814925),
		description: "two",
		color: 'lightblue'
	}, {
		eventDate: new Date(1532325814925),
		description: "three",
		color: 'lightgreen'
	}]
	
	$scope.openInterrogationDay = function(ev, d, index) {
		$mdDialog.show({
			locals : {
				day : d,
			}, 
			controller : DetailsDayCtrl,
			templateUrl : 'interrogazioni/interrogationDetails/detailsDayTMPL.html',
			parent : angular.element(document.body),
			targetEvent : ev,
			clickOutsideToClose : true,
			fullscreen : true
		}).then(function() {
			
		});
	}
}