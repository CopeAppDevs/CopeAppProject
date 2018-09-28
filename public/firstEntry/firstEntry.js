app.controller("FirstEntryCtrl", FirstEntryCtrl);

function FirstEntryCtrl($scope, localStorageService) {
	
	
	
	$('#firstEntryBackground').css('background-image', 'url(http://source.unsplash.com/'+$scope.screenSize+'/?'+$scope.backgroundTag+')');
	$('#firstEntryBackground').css({'-webkit-filter': 'blur('+$scope.backgroundBlur+'px)', '-moz-filter': 'blur('+$scope.backgroundBlur+'px)', '-o-filter': 'blur('+$scope.backgroundBlur+'px)', '-ms-filter': 'blur('+$scope.backgroundBlur+'px)', 'filter': 'blur('+$scope.backgroundBlur+'px)'})
	
}