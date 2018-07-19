app.config(function($stateProvider){
	$stateProvider.state("paginaAppunti", {
		url:"/paginaAppunti",
		templateUrl:"appunti/paginaAppunti/paginaAppunti.html",
		params: {
			idAppunto: null
		}
	})
});

app.controller("paginaAppuntiCtrl", paginaAppuntiCtrl);

function paginaAppuntiCtrl($scope, appuntiService, $stateParams){
	
	console.log($stateParams.idAppunto);
	$scope.appunto=[];
	
	var appuntoPromise = appuntiService.getAppunto($stateParams.idAppunto);
	appuntoPromise.then(function onSuccess(searchResponse) {
			$scope.appunto = searchResponse.data.appunti;
		},
			$scope.serverErrorCallbackToast);
	$scope.materia = $scope.appunto[0].nome;
	
}