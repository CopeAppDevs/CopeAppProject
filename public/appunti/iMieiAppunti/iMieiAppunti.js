app.config(function($stateProvider) {
	$stateProvider.state("iMieiAppunti", {
		url : "/iMieiAppunti",
		templateUrl : "appunti/iMieiAppunti/iMieiAppunti.html",
	})
});

app.controller("iMieiAppuntiCtrl", iMieiAppuntiCtrl);

function iMieiAppuntiCtrl($scope, appuntiService) {

	$scope.laMiaLista = [];
	$scope.indexToRetrive =0;

	var listaPromise = appuntiService.search($scope.user, "" , true, 0, 5);
	listaPromise.then(function onSuccess(searchResponse) {
		$scope.laMiaLista = searchResponse.data.appuntoMini;
		$scope.indexToRetrive += 5;
	}, $scope.serverErrorCallbackToast);

	$scope.refreshMine = function() {
		appuntiService.search($scope.user, "" , true, $scope.indexToRetrive, $scope.indexToRetrive + 5)
		.then(function(response) {
			for (var a = 0; a < response.data.appuntoMini.length; a++) {
				$scope.laMiaLista.push(response.data.appuntoMini[a]);
				$scope.indexToRetrive += 5;
			}
		}, $scope.serverErrorCallback);
	}

}
