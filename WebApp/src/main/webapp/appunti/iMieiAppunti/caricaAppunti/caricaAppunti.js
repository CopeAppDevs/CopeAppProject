app.config(function($stateProvider){
	$stateProvider.state("caricaAppunti", {
		url:"/caricaAppunti",
		templateUrl:"appunti/iMieiAppunti/caricaAppunti/caricaAppunti.html",
	})
});

app.controller("caricaAppuntiCtrl", caricaAppuntiCtrl);

function caricaAppuntiCtrl($scope, appuntiService, FileUploader, $log, $q){
	 	
	$scope.title = "";
	$scope.description = "";
	$scope.searchTextSubject = "";
	$scope.loader = "";
	$scope.classNumber = "";
	$scope.section = "";
	$scope.indirizzo = "";
	$scope.documento = "";
	$scope.searchTextTeacher = "";
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
        		if (item.size <= 10485760) {
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
	$scope.checkValidity = function ()  {
		var error = [];
		if($scope.title === "") { error.push("Non hai messo un titolo");}
		if($scope.description === "") { error.push("La descrizione !!");}
		if($scope.searchTextTeacher=== "") { error.push("Manca il prof della marteria");}
		if($scope.searchTextSubject=== "") { error.push("Manca la meteria dell'appunto");}
		if($scope.classNumber > 5) { error.push("Non sapevo ci fossero classi sopra la 5 !");}
		if($scope.classNumber === "") { error.push("In che classe sei ?");}
		if($scope.classNumber.length >= 2) { error.push("Non esiste un classe con quel nome !!");}
		if($scope.section === "") { error.push("In che sezione sei ?");}
		if($scope.section.length >= 4) { error.push("Come fa ad esistere una sezione con piu' di 3 lettere");}
		if($scope.indirizzo === "") { error.push("Indirizzo ??");}
		if($scope.documento === "") { error.push("Mi manca il documento !!");}
		if (error.length == 0) {return true}
		return error;
	}
	
$scope.uploadAppunto = function() {
		
		var response = $scope.checkValidity()
		if (response != true) {
			$scope.showSimpleToast(response[0], "bottom right", 2500);
		} else {
			$scope.showActionToast("sei sicuro l'appunto sara' visualizzabile a tutti, procedere con l'upload ?", "bottom right", 7500, "OK", function(response) {
				if ( response == 'ok' ) {
					// castare le date in stringhe
					var appunto = {
							teacher: $scope.teacher,
							subject: $scope.subject,
							title : $scope.title,
							description: $scope.description,
							likes: 0,
							dislikes: 0,
							classNumber: $scope.classNumber,
							section: $scope.section,
							indirizzo:$scope.indirizzo,
							documento: $scope.documento
							}
					appuntiService.uploadAppunto($scope.user, appunto, false).then(function onSuccess(response) {
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
		$scope.searchTextSubject = "";
		$scope.loader = "";
		$scope.classNumber = "";
		$scope.section = "";
		$scope.indirizzo = "";
		$scope.documento = "";
		$scope.searchTextTeacher = "";
	}
	 
	$scope.querySearchSubject = function (query) {
			$scope.listaSubject = [];
			for(i = 0; i<$scope.listaSubjectAll.length; i++){
				if($scope.listaSubjectAll[i].name.toLowerCase().indexOf(query) > -1){
					$scope.listaSubject.push($scope.listaSubjectAll[i]);	
				}
			}
			return $scope.listaSubject;
		
		
	    };
	
	 $scope.loadAllSubjet = function() {
		//manca poco, da fixare
	      var allSubject =  appuntiService.getMaterie($scope.user, false, "");
	      	allSubject.then(function onFulfilled(searchResponse) {
			$scope.listaSubjectAll = searchResponse.data.subjectList;
			$scope.listaSubject = $scope.listaSubjectAll;
	      	 return $scope.listaSubjectAll;
	      	},
			$scope.serverErrorCallbackToast);
	      	
	     
	};   
	
	$scope.querySearchTeacher = function(query) {
		$scope.listaTeacher = [];
		for(i = 0; i<$scope.listaTeacherAll.length; i++){
			if($scope.listaTeacherAll[i].lastname.toLowerCase().indexOf(query) > -1){
				$scope.listaTeacher.push($scope.listaTeacherAll[i]);	
			}
		}
		return $scope.listaTeacher;
		
	    };
	
	$scope.loadAllTeacher = function() {
		//manca poco, da fixare
	      var allProf =  appuntiService.teacherList($scope.user, false, "");
	      	allProf.then(function onSuccess(searchResponse) {
			$scope.listaTeacherAll = searchResponse.data.teacherList;
			$scope.listaTeacher = $scope.listaTeacherAll;
	      	 return $scope.listaTeacherAll;
	      	},
			$scope.serverErrorCallbackToast);
	      	
	     
	};    
	    $scope.selectedTeacherChange = function(item) {
	      $log.info('Item changed to ' + JSON.stringify(item));
	    };
	    
	    $scope.selectedSubjectChange = function(item) {
		      $log.info('Item changed to ' + JSON.stringify(item));
		    };
	
	    $scope.loadAllTeacher();
	    $scope.loadAllSubjet();
}

