app.config(function($stateProvider) {
	$stateProvider.state("materiaAppunti", {
		url : "/materiaAppunti",
		templateUrl : "appunti/hubAppunti/materiaAppunti/materiaAppunti.html",
		params : {
			materiaId : 0
		// da mettere null poi.
		}
	})
});

app.controller("materiaAppuntiCtrl", materiaAppuntiCtrl);

function materiaAppuntiCtrl($scope, $stateParams, appuntiService) {
	
	$scope.listaAppuntiMateria = [];
	$scope.materia = "";
	
	var appuntiMateriaPromise = appuntiService.materieAppunti($scope.user,
			$stateParams.materiaId);
	appuntiMateriaPromise.then(function onSuccess(searchResponse) {
		
		$scope.listaAppuntiMateria = searchResponse.data.appuntiMateria;
		if ($scope.listaAppuntiMateria.length > 0) {
			console.log($scope.listaAppuntiMateria[0]);
			$scope.materia = $scope.listaAppuntiMateria[0].subject.name;
		}
	}, $scope.serverErrorCallbackToast);

}
