var app = angular.module("ExceptionApp", ["ngAnimate", "ngAria", "ngMessages", "ngMaterial", "ngclipboard"]);

app.controller("ExceptionController", function($scope, $sce, $mdToast) {
	
	
  $scope.compileStackTrace = function(stackTrace) {
	  var html = stackTrace.replace(/\b(at)/g, "<br>at");
	  var trustedHtml = $sce.trustAsHtml(html);
	  return trustedHtml;
  };
  
  $scope.copyToClipboard = function() {
	  $mdToast.show(
	      $mdToast.simple()
	        .textContent('Exception copied to clipboard')
	        .position("bottom right")
	        .hideDelay(3000)
	  );
  }
  
  $scope.back = function() {
	  window.history.back();
  }
  
});