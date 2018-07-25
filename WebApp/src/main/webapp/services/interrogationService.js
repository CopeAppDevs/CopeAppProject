app.service('interrogationService', InterrogationService);

function InterrogationService($http) {
	
	this.getAllInterrogationList = function() {
		var req = {
				method: 'GET',
				url: 'http://localhost:8080/CopeApp/rest/everyInterrogationList',
				headers: {
					'Content-Type': "application/json",
					'Authorization': btoa(user.mail+":"+user.password)
				}
		}
		return $http(req);
	}
	
	
	this.getInterrogationsDetails = function(day) {
		var req = {
				method: 'POST',
				url: 'http://localhost:8080/CopeApp/rest/interrogationDay',
				headers: {
					'Content-Type': "application/json",
					'Authorization': btoa(user.mail+":"+user.password)
				},
				data: {
					onDay: day
				}
		}
		return $http(req);
	}
	
}