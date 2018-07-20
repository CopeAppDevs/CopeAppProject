app.config(function($stateProvider){
	$stateProvider.state("paginaAppunti", {
		url:"/paginaAppunti",
		templateUrl:"appunti/paginaAppunti/paginaAppunti.html",
		params: {
			idAppunto: 0
		}
	})
});

app.controller("paginaAppuntiCtrl", paginaAppuntiCtrl);

function paginaAppuntiCtrl($scope, appuntiService, $stateParams){
	
	console.log($stateParams.idAppunto);
	$scope.appunto= null;
	
	var appuntoPromise = appuntiService.getAppunto($stateParams.idAppunto);
	appuntoPromise.then(function onSuccess(searchResponse) {
			$scope.appunto = searchResponse.data.appunto;
		},
			$scope.serverErrorCallbackToast);
	
	$scope.back = function(){
		window.history.back();
	}
	
	
	
}