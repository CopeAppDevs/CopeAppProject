app.controller("MainCtrl", MainCtrl);

function MainCtrl($scope){
	
	$scope.canDeleteSurveys = function() {
		if ($scope.user.roles.indexOf("admin") == -1) { //inserire lista di ruoli abilitati a rimuovere i survey
			return false
		} else {
			return true
		}
	}
}