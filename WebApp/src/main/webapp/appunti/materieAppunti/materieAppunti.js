app.controller("materieAppuntiCtrl", materieAppuntiCtrl);

function materieAppuntiCtrl($scope, appuntiService){
	 
	$scope.subjects = [
		{displayName: "Matematica", subjectId : '1'},
		{displayName: "Geografia", subjectId: '2'},
		{displayName: "Italiano", subjectId: '3'},
		{displayName: "Informatica", subjectId: '4'}
		];
}