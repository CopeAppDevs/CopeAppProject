app.config(function($stateProvider){
	$stateProvider.state("accountSettings", {
		url:"/accountSettings",
		templateUrl:"accountSettings/accountSettings.html"
	})
});
app.controller("AccountSettingsCtrl", AccountSettingsCtrl);

function AccountSettingsCtrl($scope, FileUploader) {
	
	$scope.oldPassword = "";
	$scope.newPassword = "";
	$scope.newPasswordRepeated = "";
	
	$scope.$watch("oldPassword", function() {
		$scope.accountSettingsForm.oldPassword.$setValidity("match", $scope.oldPassword == $scope.user.password);
		$scope.accountSettingsForm.newPassword.$setValidity("equal", $scope.newPassword == $scope.newPasswordRepeated);
		$scope.accountSettingsForm.newPasswordRepeated.$setValidity("equal", $scope.newPassword == $scope.newPasswordRepeated);
	})
	$scope.$watch("newPassword", function() {
		$scope.accountSettingsForm.oldPassword.$setValidity("match", $scope.oldPassword == $scope.user.password);
		$scope.accountSettingsForm.newPassword.$setValidity("equal", $scope.newPassword == $scope.newPasswordRepeated);
		$scope.accountSettingsForm.newPasswordRepeated.$setValidity("equal", $scope.newPassword == $scope.newPasswordRepeated);
	})
	$scope.$watch("newPasswordRepeated", function() {
		$scope.accountSettingsForm.oldPassword.$setValidity("match", $scope.oldPassword == $scope.user.password);
		$scope.accountSettingsForm.newPassword.$setValidity("equal", $scope.newPassword == $scope.newPasswordRepeated);
		$scope.accountSettingsForm.newPasswordRepeated.$setValidity("equal", $scope.newPassword == $scope.newPasswordRepeated);
	})
	
	$scope.loadImage = function() {
		$("#imageUploader").click();
	}
	
	$scope.fileUploader = new FileUploader({
		filters: [{
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        }]
	});
	$scope.fileUploader.autoUpload = false;
	$scope.fileUploader.queueLimit = 1;
	$scope.newProfilePicture;
	$scope.fileUploader.onAfterAddingFile = function(item) {
		var reader = new FileReader();
		reader.readAsDataURL(item._file.slice(0, item._file.size));
		reader.onloadend = function() {
			var result = reader.result;
			var position = 5;
			var output = [result.slice(0, position), item._file.type, result.slice(position)].join('');
			$scope.newProfilePicture = output;
			$scope.user.imageUrl = output;
			//richiesta server
		}
	}
}