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
function paginaAppuntiCtrl($scope, appuntiService, $stateParams, $window){
	
	$scope.appunto= null;
	
	var appuntoPromise = appuntiService.getAppunto($scope.user, $stateParams.idAppunto);
	appuntoPromise.then(function onSuccess(searchResponse) {
			$scope.appunto = searchResponse.data.appunto;
		},
			$scope.serverErrorCallbackToast);
	
//	$scope.back = function(){
//		window.history.back();
//	}
	
	$scope.openPDFWindows = function(){
        var dataUri = $scope.appunto.documento;
//        $window.open( dataUri , "_blank");
        var win = $window.open();
        win.document.open();
        win.document.write('<html><body style="margin:0; padding:0;border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;"><iframe src="' + dataUri + '" frameborder="0" style="margin:0; padding:0;border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe></body></html>')
        win.document.close();
    };
}