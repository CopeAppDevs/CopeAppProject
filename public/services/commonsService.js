app.service('commonsService', CommonsService);

function CommonsService($http) {
	
	this.getAllRoles = function() {
		var req = {
				method: 'GET',
				url: 'http://localhost:8080/CopeApp/rest/roleList',
				headers: {
					'Content-Type': "application/json"
				}
		}
		return $http(req);
	}
	
}