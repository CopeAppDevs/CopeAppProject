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
			console.log($scope.appunto);
			let pdf = $scope.appunto.documento.substr(28);
			console.log(pdf);
			fetch(`data:application/pdf;base64,${pdf}`)
			.then(response => response.blob())
			.then(blob => document.querySelector("iframe").src = URL.createObjectURL(blob));
		},
			$scope.serverErrorCallbackToast);
	
	$scope.back = function(){
		window.history.back();
	}
	
	
	/*
	fetch($scope.appunto.documento)
	.then(response => response.blob())
	.then(blob => document.querySelector("iframe").src = URL.createObjectURL(blob));*/
	
	
}