app.config(function($stateProvider){
	$stateProvider.state("caricaAppunti", {
		url:"/caricaAppunti",
		templateUrl:"appunti/iMieiAppunti/caricaAppunti/caricaAppunti.html",
	})
});

app.controller("caricaAppuntiCtrl", caricaAppuntiCtrl);

function caricaAppuntiCtrl($scope, appuntiService, FileUploader, $log, $q){
	 var self = this;
	 
	self.prof = loadAll();
	self.querySearch   = querySearch;
	self.selectedItemChange = selectedItemChange;
	self.searchTextChange   = searchTextChange;
	
	
	$scope.title = "";
	$scope.description = "";
	$scope.subject = "";
	$scope.loader = "";
	$scope.classNumber = "";
	$scope.section = "";
	$scope.indirizzo = "";
	$scope.documento = "";
	$scope.teacher = "";
	
	
	$scope.currentImageIndex;
	$scope.loadImage = function() {
		$("#imageUploader").click();
	}
	
	$scope.fileUploader = new FileUploader({
		filters: [{
            name: 'imageFilter',
            fn: function(item /* {File|FileLikeObject} */, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                if ('|pdf|'.indexOf(type) !== -1) {
        			return true;
        		} else {
        			$scope.showSimpleToast("Sono ammessi solo formati pdf", "bottom right", 2500);
        			return false;
        		}
            }
        },
        {
        	name: 'sizeFilter',
        	fn: function(item /* {File|FileLikeObject} */, options) { 
        		if (item.size <= 1048576) {
        			return true;
        		} else {
        			$scope.showSimpleToast("Dimensione immagine massima: 10MB", "bottom right", 2500);
        			return false;
        		}
            }
        }]
	});
	$scope.fileUploader.autoUpload = false;
// $scope.fileUploader.queueLimit = 1;
	$scope.fileUploader.removeAfterUpload = true;
	$scope.fileUploader.onAfterAddingFile = function(item) {
		var reader = new FileReader();
		reader.readAsDataURL(item._file.slice(0, item._file.size));
		reader.onloadend = function() {
			var result = reader.result;
			var position = 5;
			var output = [result.slice(0, position), item._file.type, result.slice(position)].join('');
			$scope.documento = output;
			$scope.showSimpleToast("Documento caricato con successo", "bottom right", 2500);
		}
	}
	$scope.checkValidity = function ()   {
		return true;
	}
	
$scope.uploadAppunto = function() {
		
		var response = $scope.checkValidity()
		if (response != true) {
			$scope.showSimpleToast(response[0], "bottom right", 2500);
		} else {
			$scope.showActionToast("sei sicuro l'appunto sarà visualizzabile a tutti, procedere con l'upload ?", "bottom right", 7500, "OK", function(response) {
				if ( response == 'ok' ) {
					// castare le date in stringhe
					var appunto = {
							teacher: $scope.teacher,
							subject: $scope.subject,
							title : $scope.title,
							description: $scope.description,
							likes: 0,
							dislikes: 0,
							// ricordati che devi morire!!!!
							classNumber: $scope.classNumber,
							section: $scope.section,
							indirizzo:$scope.indirizzo,
							documento: $scope.documento
							}						
					appuntiService.uploadAppunti($scope.user, apunto, false).then(function(response) {
						$scope.goto("appunti", {selectedTab: 2});
						$scope.showSimpleToast("Appunto salvato con ID : "+response.data.appunto.appuntoId, "bottom right", 2500);
					}, $scope.serverErrorCallbackToast)
				}
			});
		}
		
		
	}

	$scope.exit = function() {
		$scope.showActionToast("Vuoi uscire? Perderai le modifiche.", "bottom right", 3000, "OK", function(response) {
			if (response=="ok") {
				$scope.goto('appunti', {selectedTab : 2});
			}
		});
	}
	
	$scope.resetAll = function () {
		$scope.title = "";
		$scope.description = "";
		$scope.subject = "";
		$scope.loader = "";
		$scope.classNumber = "";
		$scope.section = "";
		$scope.indirizzo = "";
		$scope.documento = "";
		$scope.teacher = "";
	}
	 
	function querySearch (query) {
	      var results = query ? self.prof.filter( createFilterFor(query) ) : self.prof,
	          deferred;
	      if (self.simulateQuery) {
	        deferred = $q.defer();
	        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
	        return deferred.promise;
	      } else {
	        return results;
	      }
	    }
	
	 function searchTextChange(text) {
	      $log.info('Text changed to ' + text);
	    }

	    function selectedItemChange(item) {
	      $log.info('Item changed to ' + JSON.stringify(item));
	    }
	 
	function loadAll() {
		//manca poco, da fixare
		$scope.listaTeacher = [];
	      var allProf =  appuntiService.teacherList();
	      	allProf.then(function onSuccess(searchResponse) {
			$scope.listaTeacher = searchResponse.data.teachers;
	      	console.log($scope.listaTeacher);
	      	 return $scope.listaTeacher.map( function (prof) {
	 	      	prof.value= prof.nome.toLowerCase();
	 	          return prof;
	 	        
	 	      });
	      	},
			$scope.serverErrorCallbackToast);
	      	
	     
	}    
	
	function createFilterFor(query) {
	      var lowercaseQuery = query.toLowerCase();

	      return function filterFn(prof) {
	        return (prof.value.indexOf(lowercaseQuery) === 0);
	      };

	}
}

