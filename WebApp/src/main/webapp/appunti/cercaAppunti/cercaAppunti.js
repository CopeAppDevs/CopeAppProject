app.controller("cercaAppuntiCtrl", cercaAppuntiCtrl);

function cercaAppuntiCtrl($scope, appuntiService){
	 $scope.appuntiLista=[];
	 $scope.text = null;
	 $scope.search = function () {
	var appuntiPromise = appuntiService.search($scope.user, $scope.text, false, 0, 5);
	appuntiPromise.then(function onSuccess(searchResponse) {
			$scope.appuntiLista = searchResponse.data.appunti;
		},
			$scope.serverErrorCallbackToast);
		}
}