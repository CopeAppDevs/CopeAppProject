app.controller("DetailsDayCtrl", DetailsDayCtrl);
function DetailsDayCtrl($scope, $sce, $mdDialog, day){
	
	$scope.day = day;
	$scope.interrogations = [];
	
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.interrogations = [{
		eventDate: moment(new Date(1532025814925)).format('DD/MM/YYYY'),
		description: "one",
		students: [{firstname: "fabio", lastname: "tessaro"}, {firstname: "ungu", lastname: "ungu"}],
		subject: "informatica"
		}, 
		{
		eventDate:  moment(new Date(1532025814925)).format('DD/MM/YYYY'),
		description: "two",
		subject: "informatica"
		}, {
		eventDate:  moment(new Date(1532025814925)).format('DD/MM/YYYY'),
		description: "three",
		subject: "informatica"
	}]

//	InterrogationService.getInterrogationDetails($scope.day).then(
//			function(response) {
//					for (var a = 0; a < response.data.interrogations.length; a++) {
//						$scope.interrogations.push(response.data.interrogations[a]);
//					}
//				//TODO rifare quando DTO sarà risistemato
//	});
//	
	$scope.isOn = function(list) {
		if(list.firstname.indexOf($scope.user.firstname) > -1){
			return(true);
		}
		return(false);
	}
	
	
	
	
	console.log("passing  -->  " + $scope.day)
}