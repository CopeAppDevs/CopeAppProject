app.controller("cercaAppuntiCtrl", cercaAppuntiCtrl);

function cercaAppuntiCtrl($scope, appuntiService){
	 $scope.appuntiLista=[];
	 $scope.text = null;
	 $scope.search = function () {
	var appuntiPromise = appuntiService.search($scope.user, $scope.text, false, 0, 5);
	appuntiPromise.then(function onSuccess(searchResponse) {
			console.log($scope.text);
			$scope.appuntiLista = searchResponse.data.appuntoMini;
		},
			$scope.serverErrorCallbackToast);
		}
}