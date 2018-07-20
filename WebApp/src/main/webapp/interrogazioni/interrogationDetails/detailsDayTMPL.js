app.controller("DetailsDayCtrl", DetailsDayCtrl);
function DetailsDayCtrl($scope, $sce, $mdDialog, day){
	
	$scope.day = day;
	
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	
	console.log("--> " + $scope.day)
}