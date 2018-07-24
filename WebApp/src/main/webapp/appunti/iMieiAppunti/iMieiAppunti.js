app.config(function($stateProvider) {
	$stateProvider.state("iMieiAppunti", {
		url : "/iMieiAppunti",
		templateUrl : "appunti/iMieiAppunti/iMieiAppunti.html",
	})
});

app.controller("iMieiAppuntiCtrl", iMieiAppuntiCtrl);

function iMieiAppuntiCtrl($scope, appuntiService) {

	$scope.laMiaLista = [];

	var listaPromise = appuntiService.search($scope.user, "" , true, 0, 5);
	listaPromise.then(function onSuccess(searchResponse) {
		$scope.laMiaLista = searchResponse.data.appunti;
	}, $scope.serverErrorCallbackToast);

	$scope.refreshMine = function() { //TODO raddoppia gli appunti ??? WHAT
		appuntiService.search($scope.user, "" , true, 0, 5)
		.then(function(response) {
			for (var a = 0; a < response.data.appunti.length; a++) {
				$scope.laMiaLista.push(response.data.appunti[a]);
			}
		}, $scope.serverErrorCallback);
	}

}
