app.config(function($stateProvider) {
	$stateProvider.state("createSurvey", {
		url : "/createSurvey",
		templateUrl : "surveys/createSurvey/createSurvey.html"
	})
});
app.controller("CreateSurveyCtrl", CreateSurveyCtrl);

function CreateSurveyCtrl($scope, $moment, surveyService, commonsService, $mdMenu, FileUploader) {

	$scope.question = "";
	$scope.minPublishDate = $moment(new Date).add(0, 'days').startOf("day").toDate();
	$scope.maxPublishDate = $moment(new Date).add(9, 'months').startOf("day").toDate();
	$scope.startDate = $moment(new Date).add(0, 'days').startOf("day").toDate();
	$scope.expireDate = $moment(new Date).add(1, "days").endOf("day").toDate();
	
	$scope.$watch("startDate", function(value) {
		$scope.minCloseDate = $moment(value).add(1, 'days').endOf("day").toDate();
		$scope.maxCloseDate = $moment(value).add(9, 'months').endOf("day").toDate();
		if ($scope.expireDate.getTime() < value.getTime()) {
			$scope.expireDate = $moment(value).add(1, "days").endOf("day").toDate();
		}
	})

	//TODO giochicchiare con le impostazioni per la versione desktop https://www.tinymce.com/docs/configure/
	//TODO cambiare colori al tutto usando questo tool http://skin.tinymce.com/?_ga=2.96845919.1922290377.1525292558-662263511.1524315199
	$scope.tinymceOptions = {
		theme : 'modern',
		mobile : {
			theme : 'mobile',
			plugins : [ 'lists', 'autolink' ],
			toolbar : [ 'undo', 'redo', 'bold', 'italic', 'underline', 'link',
					'image', 'bullist', 'numlist', 'fontsizeselect',
					'styleselect' ],
			branding : false
		},
		branding : false
	}

	
	$scope.isChecked = function(selected) {
		return selected.length === $scope.roles.length;
	};
	$scope.isIndeterminate = function(selected) {
		return (selected.length !== 0 && selected.length !== $scope.roles.length);
	};
	$scope.toggleAll = function(selected) {
		if (selected.length === $scope.roles.length) {
			selected.length = 0;
		} else if (selected.length === 0 || selected.length > 0) {
			selected.length = 0;
			selected.push(...$scope.roles);
		}
	};
	$scope.toggle = function(item, list) {
		var idx = list.indexOf(item);
		if (idx > -1) {
			list.splice(idx, 1);
		} else {
			list.push(item);
		}
	};

	$scope.exists = function(item, list) {
		return list.indexOf(item) > -1;
	};
	
	$scope.roles = [];
	commonsService.getAllRoles().then(
		function(value) {
			$scope.roles = value.data.roles;
		},
		function(reason) {
			$scope.roles = null;
			$scope.serverErrorCallbackToast(reason);
	})
	$scope.selectedVoters = [];
	$scope.selectedViewers = [];
	$scope.answerNumber;
	$scope.maxNumberOfAnswers = 0;
	$scope.orderedTypes = [];
	
	$scope.currentImageIndex;
	$scope.loadImage = function(index) {
		$("#imageUploader").click();
		$scope.currentImageIndex = index;
	}
	$scope.fileUploader = new FileUploader({
		filters: [{
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                if ('|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1) {
        			return true;
        		} else {
        			$scope.showSimpleToast("Sono ammesse solo immagini", "bottom right", 2500);
        			return false;
        		}
            }
        },
        {
        	name: 'sizeFilter',
        	fn: function(item /*{File|FileLikeObject}*/, options) {  //TODO forse funziona
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
//	$scope.fileUploader.queueLimit = 1;
	$scope.fileUploader.removeAfterUpload = true;
	$scope.fileUploader.onAfterAddingFile = function(item) {
		var reader = new FileReader();
		reader.readAsDataURL(item._file.slice(0, item._file.size));
		reader.onloadend = function() {
			var result = reader.result;
			var position = 5;
			var output = [result.slice(0, position), item._file.type, result.slice(position)].join('');
			$scope.answers[$scope.currentImageIndex].answerContent.answerImage = output;
			$scope.showSimpleToast("Immagine caricata con successo", "bottom right", 2500);
		}
	}
	
	$scope.addAnswer = function(type) {
		if (type=="DATE") {
			$scope.answers.push({
				votesNumber: 0,
				answerType: ""+type+"",
				answerContent: {answerText: $moment($scope.expireDate).add(1, "days").toDate(), answerImage: null}
			})
		} else if (type=="TEXT") {
			$scope.answers.push({
				votesNumber: 0,
				answerType: ""+type+"",
				answerContent: {answerText: "", answerImage: null}
			})
		} else if(type=="IMAGE") {
			$scope.answers.push({
				votesNumber: 0,
				answerType: ""+type+"",
				answerContent: {answerText: "", answerImage: ""}
			})
		}
		$scope.maxNumberOfAnswers = $scope.answers.length - 1;
	}
	$scope.removeAnswer = function(index) {
		$scope.answers.splice(index, 1);
		$scope.maxNumberOfAnswers = $scope.answers.length - 1;
	}
	$scope.getField = function(index) {
		return eval("surveyCreateForm.answer_"+index+".$error");
	}
	
	$scope.answers = [];
	
	$scope.resetAll = function() {
		$scope.question = "";
		$scope.startDate = $moment(new Date).add(0, 'days').toDate();
		$scope.expireDate = $moment(new Date).add(1, "days").toDate();
		$scope.answers.length = 0;
		$scope.selectedVoters.length = 0;
		$scope.selectedViewers.length = 0;
		$scope.answerNumber = null;
		$scope.maxNumberOfAnswers = 0;
		$scope.orderedTypes.length = 0;
	}
	
	$scope.openAddMenu = function($mdMenu, ev) {
			originatorEv = ev;
			$mdMenu.open(ev);
	}
	
	$scope.checkValidity = function() {	
		var error = [];
		if($scope.question === "") { error.push("La domanda non contiene testo");}
		var a = $moment(new Date()).startOf("day").toDate();
		if($scope.expireDate.getTime() < $scope.startDate.getTime()) { error.push("La scadenza e' precedente alla pubblicazione");}
		if($scope.selectedVoters.length < 1) { error.push("Nessuno potra' votare il sondaggio");}
		if($scope.selectedViewers.length < 1) { error.push("Nessuno potra' vedere il sondaggio!");}
		if($scope.answerNumber < 1) { $scope.answerNumber = 1}
		if($scope.answers.length < 1) { error.push("Il sondaggio non contiene risposte");}
		if (error.length == 0) {return true}
		return error;
	}
	
	$scope.exit = function() {
		$scope.showActionToast("Vuoi uscire? Perderai le modifiche.", "bottom right", 3000, "OK", function(response) {
			if (response=="ok") {
				$scope.goto("surveys");
			}
		});
	}
	

	$scope.uploadSurvey = function() {
		
		var response = $scope.checkValidity()
		if (response != true) {
			$scope.showSimpleToast(response[0], "bottom right", 2500);
		} else {
			$scope.showActionToast("Il sondaggio sara' modificabile solo fino alla data di publicazione. Vuoi davvero procedere al caricamento?", "bottom right", 7500, "OK", function(response) {
				if ( response == 'ok' ) {
					//castare le date in stringhe
					var survey = {
							question: $scope.question,
							answersNumber: $scope.answerNumber,
							openSurveyDate: $scope.startDate,
							closeSurveyDate: $scope.expireDate,
							insertDate: new Date(),
							insertUser: $scope.getUser(),
							surveyVotersRoles: $scope.selectedVoters,
							surveyViewersRoles: $scope.selectedViewers,
							answers: $scope.answers,
							voters: 0
						}
					for (var i = 0; i < survey.answers.length; i++) {
						if (survey.answers[i].answerType == "DATA") {
							survey.answers[i].answerContent.answerText = $moment(survey.answers[i].answerContent.answerText).format("ddd DD/MM/YYYY");
						}
					}
					surveyService.uploadSurvey($scope.user, survey, false).then(function(response) {
						$scope.goto("surveys");
						$scope.showSimpleToast("Sondaggio salvato con ID : "+response.data.survey.surveyId, "bottom right", 2500);
					}, $scope.serverErrorCallbackToast)
				}
			});
		}
		
		
	}
	
}


