app.controller("SidenavHeaderCtrl",SHCtrl);

function SHCtrl($scope){
	
	$scope.$watch("user", function() {
		$("#backgroundContainer").ready(
			function() {
				var sidenavWidth = $("#leftSidenav").width();
				var sidenavHeight = $("#leftSidenav").height();
				if($scope.user.wallpaper == 'default'){
						var pattern = Trianglify({
								width: sidenavWidth,
								height: sidenavHeight/4,
								variance: 1,
								x_colors: 'YlGnBu'
						});
						$scope.userWallpaper = pattern.png();
				} else {
					$scope.userWallpaper = $scope.user.wallpaper;
				}
				$("#backgroundContainer").css("background-image", "url("+$scope.userWallpaper+")");
			}
		);
	})
	
}
