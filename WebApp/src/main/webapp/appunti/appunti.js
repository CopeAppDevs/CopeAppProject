app.config(function($stateProvider) {
	$stateProvider.state("appunti", {
		url : "/appunti",
		templateUrl : "appunti/appunti.html"
	})
});
app.controller("AppuntiCtrl", AppuntiCtrl);

function AppuntiCtrl($scope){
	
	$scope.appuntiLista = [];
	$scope.searchBar = {
	        "width" : "137.5%"
	    }
	
	$scope.search = function(){
		//tira fuori dal database 10 elementi;
		//partendo dalla lunghezza dell'array appuntiLista fino a appuntilista+10
		console.log("Funzia");
	}
	
	$scope.subjects = [
		{displayName: "Matematica", subjectId : '1'},
		{displayName: "Geografia", subjectId: '2'},
		{displayName: "Italiano", subjectId: '3'},
		{displayName: "Informatica", subjectId: '4'}
		];
	// riccio's work
	$scope.onClickMateria = function(){
		console.log("Il click di materia funzia :D");
	}
	//kama's work
	/*
	 * un appunto ha 
	 * id
	 * owner
	 * subject
	 * formato
	 * tag
	 * professore
	 * 
	 */
	$scope.miaListaAppunti = [];
	$scope.uploadFile = function(){
		console.log("ciao da i miei");
	};
	
	
}