app.controller("cercaAppuntiCtrl", cercaAppuntiCtrl);

function cercaAppuntiCtrl($scope, appuntiService){
	 $scope.appuntiLista=[];
	 $scope.text = null;
	 $scope.search = function () {
	var appuntiPromise = appuntiService.search($scope.text);
	appuntiPromise.then(function onSuccess(searchResponse) {
			$scope.appuntiLista = searchResponse.data.appunti;
		},
			$scope.serverErrorCallbackToast);
		}
}