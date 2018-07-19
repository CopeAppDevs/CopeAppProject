app.controller("materieAppuntiCtrl", materieAppuntiCtrl);

function materieAppuntiCtrl($scope, appuntiService){

	$scope.subjectList=[];
	
	$scope.init = function(){
		var subjectPromise = appuntiService.getMaterie();
		subjectPromise.then(function onSuccess(searchResponse){
			$scope.subjectList = searchResponse.data.materie;
		},
				$scope.serverErrorCallbackToast);
	 }

	$scope.init();
	
}