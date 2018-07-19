app.config(function($stateProvider) {
	$stateProvider.state("materiaAppunti", {
		url : "/materiaAppunti",
		templateUrl : "appunti/hubAppunti/materiaAppunti/materiaAppunti.html",
		params: {
			materiaId: 0 //da mettere null poi.
		}
	})
});

app.controller("materiaAppuntiCtrl", materiaAppuntiCtrl);

function materiaAppuntiCtrl($scope, $stateParams, appuntiService){
	
	$scope.listaAppuntiMateria = [];
	var appuntiMateriaPromise = appuntiService.search($stateParams.materiaId);
	appuntiMateriaPromise.then(function onSuccess(searchResponse) {
			$scope.listaAppuntiMateria = searchResponse.data.appunti;
	},
			$scope.serverErrorCallbackToast);

}
