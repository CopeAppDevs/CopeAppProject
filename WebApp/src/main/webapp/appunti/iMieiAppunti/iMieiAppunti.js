app.config(function($stateProvider){
	$stateProvider.state("iMieiAppunti", {
		url:"iMieiAppunti",
		templateUrl:"appunti/iMieiAppunti/iMieiAppunti.html",
	})
});

app.controller("iMieiAppuntiCtrl", iMieiAppuntiCtrl);

function iMieiAppuntiCtrl($scope, appuntiService){
		
	$scope.laMiaLista = [];
          
}
