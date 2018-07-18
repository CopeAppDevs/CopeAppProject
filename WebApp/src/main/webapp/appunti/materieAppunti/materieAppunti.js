app.controller("materieAppuntiCtrl", materieAppuntiCtrl);

function materieAppuntiCtrl($scope, appuntiService){
//	 
//	$scope.subjects = [
//		{displayName: "Matematica", subjectId : '1'},
//		{displayName: "Geografia", subjectId: '2'},
//		{displayName: "Italiano", subjectId: '3'},
//		{displayName: "Informatica", subjectId: '4'}
//		];
	
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