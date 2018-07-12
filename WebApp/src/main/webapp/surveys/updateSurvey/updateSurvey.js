app.controller("UpdateSurveyCtrl", UpdateSurveyCtrl);

function UpdateSurveyCtrl($scope, $mdDialog, $moment, $state, surveyService, commonsService, $mdMenu, FileUploader, 
		user, surveyId, question, startDate, expireDate, answers, selectedVoters, selectedViewers, answerNumber,
		serverErrorCallback, serverErrorCallbackToast, showSimpleToast, showActionToast) {

	$scope.user = user;
	$scope.serverErrorCallback = serverErrorCallback;
	$scope.serverErrorCallbackToast = serverErrorCallbackToast;
	$scope.showSimpleToast = showSimpleToast;
	$scope.showActionToast = showActionToast;
	
	$scope.surveyId = surveyId;
	$scope.question = question;
	$scope.startDate = new Date(startDate);
	$scope.expireDate = new Date(expireDate);
	for (var i = 0; i < answers.length; i++) {
		if (answers[i].answerType == "DATE") {
			answers[i].answerContent.answerText = $moment(answers[i].answerContent.answerText, "ddd DD/MM/YYYY").toDate();
		}
	}
	$scope.answers = answers;
	
	$scope.selectedVoters = selectedVoters;
	$scope.selectedViewers = selectedViewers;
	$scope.answerNumber = answerNumber;
	$scope.maxNumberOfAnswers = $scope.answers.length - 1;
	$scope.minPublishDate = $moment(new Date).add(0, 'days').startOf("day").toDate();
	$scope.maxPublishDate = $moment(new Date).add(9, 'months').startOf("day").toDate();
	$scope.startDate = new Date(startDate);
	$scope.expireDate = new Date(expireDate);

	$scope.$watch("startDate", function(value) {
		$scope.minCloseDate = $moment(value).add(1, 'days').endOf("day").toDate();
		$scope.maxCloseDate = $moment(value).add(9, 'months').endOf("day").toDate();
		if ($scope.expireDate.getTime() < value.getTime()) {
			$scope.expireDate = $moment(value).add(1, "days").endOf("day").toDate();
		}
	})

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
	$scope.indexOf = function(item, list) {
		for (var i = 0; i < list.length; i++) {
		    if (list[i].roleId == item.roleId) {
		        return i; 
		    }
		}
		return -1;
	}
	$scope.toggle = function(item, list) {
		var idx = $scope.indexOf(item, list);
		if (idx > -1) {
			list.splice(idx, 1);
		} else {
			list.push(item);
		}
	};

	$scope.exists = function(item, list) {
		for (var i = 0; i < list.length; i++) {
		    if (list[i].roleId == item.roleId) {
		        return true; 
		    }
		}
	    return false;
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
		return eval("surveyUpdateForm.answer_"+index+".$error");
	}
	
	$scope.resetAll = function() {
		$scope.question = "";
		$scope.startDate = $moment(new Date).add(0, 'days').toDate();
		$scope.expireDate = $moment(new Date).add(1, "days").toDate();
		$scope.answers.length = 0;
		$scope.selectedVoters.length = 0;
		$scope.selectedViewers.length = 0;
		$scope.answerNumber = null;
		$scope.maxNumberOfAnswers = 0;
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
				$mdDialog.hide()
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
							surveyId: $scope.surveyId,
							question: $scope.question,
							answersNumber: $scope.answerNumber,
							openSurveyDate: $scope.startDate,
							closeSurveyDate: $scope.expireDate,
							insertDate: new Date(),
							insertUser: $scope.user,
							surveyVotersRoles: $scope.selectedVoters,
							surveyViewersRoles: $scope.selectedViewers,
							answers: $scope.answers,
							voters: 0
						}
					for (var i = 0; i < survey.answers.length; i++) {
						if (survey.answers[i].answerType == "DATE") {
							survey.answers[i].answerContent.answerText = $moment(survey.answers[i].answerContent.answerText).format("ddd DD/MM/YYYY");
						}
					}
					surveyService.uploadSurvey($scope.user, survey, true).then(function(response) {
						$mdDialog.hide(true);
						$scope.showSimpleToast("Sondaggio aggiornato!", "bottom right", 2500);
					}, $scope.serverErrorCallbackToast)
				}
			});
		}
	}
	
}


