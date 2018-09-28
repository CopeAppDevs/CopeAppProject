app.controller("cercaAppuntiCtrl", cercaAppuntiCtrl);

function cercaAppuntiCtrl($scope, appuntiService){
	
	$scope.appuntiLista=[];
	 $scope.text = null;
	 $scope.indexToRetrive =0;

		
	 $scope.search = function () {
	var appuntiPromise = appuntiService.search($scope.user, $scope.text, false, 0, 5);
	appuntiPromise.then(function onSuccess(searchResponse) {
			$scope.appuntiLista = searchResponse.data.appuntoMini;
			$scope.indexToRetrive += 5;
		},
			$scope.serverErrorCallbackToast);
		}
	
	 $scope.refresh = function() {
			appuntiService.search($scope.user, "" , true, $scope.indexToRetrive - 1, $scope.indexToRetrive + 5)
			.then(function(response) {
				for (var a = 0; a < response.data.appuntoMini.length; a++) {
					$scope.appuntiLista.push(response.data.appuntoMini[a]);
					$scope.indexToRetrive += 5;
				}
			}, $scope.serverErrorCallback);
		}
}