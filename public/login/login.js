app.controller("LoginCtrl", LoginCtrl);

function LoginCtrl($scope, localStorageService, UserService){
	
	$scope.login = function() {
		var loginPromise = UserService.login($scope.username, $scope.password);
		loginPromise.then(function onSuccess(loginResponse) {
			$scope.setUser(loginResponse.data.user);
			if ($scope.remember) {
				localStorageService.remove("credentials");
				localStorageService.set("credentials", {username: $scope.username, password: $scope.password, remember: $scope.remember});
			} else {
				localStorageService.remove("credentials");
			}
			$scope.setLoggedIn(true);
		}, $scope.serverErrorCallbackToast);
	}
	if (localStorageService.get("credentials") == null) {
		//cambiare queste variabili per impostare le credenziali di default
		$scope.username = "";
		$scope.password = "";
		$scope.remember = true;
	} else {
		var user = localStorageService.get("credentials");
		$scope.username = user.username;
		$scope.password = user.password;
		$scope.remember = user.remember;
	}
	
	$('#loginBackground').css('background-image', 'url(http://source.unsplash.com/'+$scope.screenSize+'/?'+$scope.backgroundTag+')');
	$('#loginBackground').css({'-webkit-filter': 'blur('+$scope.backgroundBlur+'px)', '-moz-filter': 'blur('+$scope.backgroundBlur+'px)', '-o-filter': 'blur('+$scope.backgroundBlur+'px)', '-ms-filter': 'blur('+$scope.backgroundBlur+'px)', 'filter': 'blur('+$scope.backgroundBlur+'px)'})
}