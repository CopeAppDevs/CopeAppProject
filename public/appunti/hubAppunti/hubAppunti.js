app.controller("materieAppuntiCtrl", materieAppuntiCtrl);

function materieAppuntiCtrl($scope, appuntiService){

	$scope.subjectList=[];
	
	$scope.init = function(){
		var subjectPromise = appuntiService.getMaterie($scope.user, false, "");
		subjectPromise.then(function onSuccess(searchResponse){
			$scope.subjectList = searchResponse.data.subjectList;
		},
				$scope.serverErrorCallbackToast);
	 }

	$scope.init();
	
}