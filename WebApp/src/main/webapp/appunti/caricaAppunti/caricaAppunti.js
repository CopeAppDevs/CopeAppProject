app.config(function($stateProvider){
	$stateProvider.state("caricaAppunti", {
		url:"/caricaAppunti",
		templateUrl:"appunti/caricaAppunti/caricaAppunti.html"
	})
});

app.controller("caricaAppuntiCtrl", caricaAppuntiCtrl);

function caricaAppuntiCtrl($scope, appuntiService){
	$scope.compiling = false
		
	$scope.goToLoading = function (){
		compile = true;
		goto('caricaAppunti');
		}
	 }