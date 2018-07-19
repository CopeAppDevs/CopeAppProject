app.config(function($stateProvider) {
	$stateProvider.state("appunti", {
		url : "/appunti",
		templateUrl : "appunti/appunti.html",
		params: {
			selectedTab : 0
		}
	})
});
app.controller("AppuntiCtrl", AppuntiCtrl);

function AppuntiCtrl($scope, $stateParams){
	
	$scope.selectedTab = $stateParams.selectedTab;
	$scope.appuntiLista = [];
	$scope.searchBar = {
	        "width" : "137.5%"
	    }
	
	$scope.search = function(){
		//tira fuori dal database 10 elementi;
		//partendo dalla lunghezza dell'array appuntiLista fino a appuntilista+10
		console.log("Funzia");
	}
	
	/* COLLEGAMENTO AL SERVICE PER TIRARE FUORI LE MATERIE non va :(
	$scope.materieLista = null;
	$scope.materia = function (){
//		 console.log("ciao dalla search");
		var materiaProm = appuntiService.getMaterie();
		materiaProm.then(function onSuccess(searchResponse){
			$scope.materieLista = searchResponse.data.materia;
		},
				$scope.serverErrorCallbackToast);
	 }
	 */
	
	$scope.miaListaAppunti = [];
	$scope.uploadFile = function(){
		console.log("ciao da i miei");
	};
	
	
}