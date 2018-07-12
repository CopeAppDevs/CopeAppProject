app.config(function($stateProvider) {
	$stateProvider.state("surveys", {
		url : "/surveys",
		templateUrl : "surveys/surveys.html"
	})
});
app.controller("SurveysCtrl", SurveysCtrl);

function SurveysCtrl($scope, $sce, $moment, surveyService, $mdDialog) {

	// TODO mettere bottone modifica
	$scope.activeSurveys = [];
	$scope.refreshActive = function() {
		surveyService.getSurveys($scope.user, true, false,
				$scope.activeSurveys.length).then(function(response) {
			for (var a = 0; a < response.data.surveyMini.length; a++) {
				$scope.activeSurveys.push(response.data.surveyMini[a]);
			}
		}, $scope.serverErrorCallback);
	}
	$scope.finishedSurveys = [];
	$scope.refreshFinished = function() {
		surveyService.getSurveys($scope.user, false, false,
				$scope.finishedSurveys.length).then(function(response) {
			for (var a = 0; a < response.data.surveyMini.length; a++) {
				$scope.finishedSurveys.push(response.data.surveyMini[a]);
			}
		}, $scope.serverErrorCallback);
	}
	$scope.mySurveys = [];
	$scope.refreshMine = function() { // TODO: vengono triplicati i sondaggi
										// propri, per qualche ragione
		surveyService.getSurveys($scope.user, false, true,
				$scope.mySurveys.length).then(function(response) {
			for (var a = 0; a < response.data.surveyMini.length; a++) {
				$scope.mySurveys.push(response.data.surveyMini[a]);
			}
		}, $scope.serverErrorCallback);
	}
	$scope.$watch("user", function() {
		$scope.refreshActive();
		$scope.refreshFinished();
		$scope.refreshMine();
	});
	
	$scope.canModifySurvey = function(openSurveyDate) {
		if ($moment(new Date(openSurveyDate)).isBefore(new Date())) {
			return false
		} else {
			return true
		}
	}
	$scope.modifySurvey = function(ev, surveyId, openSurveyDate) {
		if ($moment(new Date(openSurveyDate)).isBefore(new Date())) {
			$scope.showSimpleToast("Il sondaggio e' già stato pubblicato", "bottom right", 2500);
		} else {
			surveyService.getSurveyById($scope.user, surveyId).then(function(response) {
				$mdDialog.show({
					locals : {
						user : $scope.user,
						surveyId: response.data.surveyDTO.surveyId,
						question : response.data.surveyDTO.question,
						startDate : response.data.surveyDTO.openSurveyDate,
						expireDate : response.data.surveyDTO.closeSurveyDate, 
						answers : response.data.surveyDTO.answers, 
						selectedVoters : response.data.surveyDTO.surveyVotersRoles, 
						selectedViewers : response.data.surveyDTO.surveyViewersRoles, 
						answerNumber : response.data.surveyDTO.answersNumber,
						serverErrorCallback : $scope.serverErrorCallback,
						serverErrorCallbackToast : $scope.serverErrorCallbackToast,
						showSimpleToast : $scope.showSimpleToast,
						showActionToast : $scope.showActionToast,
					},
					controller : "UpdateSurveyCtrl",
					templateUrl : 'surveys/updateSurvey/updateSurvey.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : $scope.fullscreen
				}).then(function(response) {
					if (response) {
						$scope.reload();
					}
				});
			}, $scope.serverErrorCallback);
		}
	}

	$scope.calculateExpireDate = function(closeDate, openDate) {
		var TODAY = new Date();
		var remainingTime = "";
		if ($moment(TODAY).isBefore(new Date(closeDate)) && $moment(TODAY).isAfter(new Date(openDate))) {
			remainingTime = "Scade " +$moment(new Date(closeDate)).fromNow();
		} else if ($moment(TODAY).isBefore(new Date(openDate))) {
			remainingTime = "Apre " +$moment(new Date(openDate)).fromNow();
		} else if ($moment(TODAY).isAfter(new Date(closeDate))) {
			remainingTime = "Scaduto " +$moment(new Date(closeDate)).fromNow();
		} else {
			remainingTime = "Invalid date"
		}
		return remainingTime;
	}
	$scope.fullscreen = true;

	$scope.showSurveyDetails = function(ev, id, index) {
		$mdDialog.show({
			locals : {
				user : $scope.user,
				surveyId : id,
				serverErrorCallback : $scope.serverErrorCallback,
				serverErrorCallbackToast : $scope.serverErrorCallbackToast,
				showSimpleToast : $scope.showSimpleToast,
				showActionToast : $scope.showActionToast
			}, // passa il campo id ad alias surveyId al controller del dialog
			controller : SurveyPageCtrl,
			templateUrl : 'surveys/surveyPage/surveyPageTMPL.html',
			parent : angular.element(document.body),
			targetEvent : ev,
			clickOutsideToClose : true,
			fullscreen : $scope.fullscreen
		}).then(function(votes) {
			if (votes != null) {
				$scope.activeSurveys[index].voters++;
			}
		});
	}
	$scope.deleteSurvey = function(surveyId) {
		$scope.showActionToast("Sicuro di voler cancellare il sondaggio?", "bottom right", 3000, "OK", function(response) {
					if (response=="ok") {
						surveyService.deleteSurvey($scope.user, surveyId).then(
							function() {
								$scope.showSimpleToast("Sondaggio eliminato!", "bottom right", 2500);
								$scope.reload();
							}, $scope.serverErrorCallbackToast)
					}
				});
	}
}
