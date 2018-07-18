app.config(function($stateProvider){
	$stateProvider.state("caricaAppunti", {
		url:"/caricaAppunti",
		templateUrl:"appunti/iMieiAppunti/caricaAppunti/caricaAppunti.html",
	})
});

app.controller("caricaAppuntiCtrl", caricaAppuntiCtrl);

function caricaAppuntiCtrl($scope, appuntiService, FileUploader){
	
	$scope.title = "";
	$scope.description = "";
	$scope.subject = "";
	$scope.prof = "";
	$scope.loader = "";
	
	
	$scope.goToLoading = function (){
		compile = true;
		goto('caricaAppunti');
		}
	
	$scope.loadImage = function() {
		$("#imageUploader").click();
	}
	
	$scope.fileUploader = new FileUploader({
		filters: [{
            name: 'imageFilter',
            fn: function(item /* {File|FileLikeObject} */, options) {
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
        	fn: function(item /* {File|FileLikeObject} */, options) { 
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
	$scope.exit = function() {
		$scope.showActionToast("Vuoi uscire? Perderai le modifiche.", "bottom right", 3000, "OK", function(response) {
			if (response=="ok") {
				$scope.goto("iMieiAppunti");
			}
		});
	}
	
	$scope.resetAll = function () {
		$scope.title = "";
		$scope.description = "";
		$scope.subject = "";
		$scope.prof = "";
		$scope.loader = "";
	}
             
}
