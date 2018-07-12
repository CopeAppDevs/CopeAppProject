var app = angular.module("CopeApp", ["ngMaterial","ngMessages","ngAnimate","ngSanitize","ngAria","ui.router","LocalStorageModule","ngLetterAvatar","angularFileUpload", "angular-momentjs","ui.tinymce", "chart.js"]);

app.config(function($urlRouterProvider, localStorageServiceProvider, $mdDateLocaleProvider){
	$urlRouterProvider.otherwise(function($injector){
		return "/home";
	});
	localStorageServiceProvider.setPrefix('CopeApp');
	localStorageServiceProvider.setDefaultToCookie(false);
	$mdDateLocaleProvider.formatDate = function(date) {
		return moment(date).format('DD/MM/YYYY');
	};
});

app.filter('trustAsHtml',['$sce', function($sce) {
	return function(text) {
		return $sce.trustAsHtml(text);
	};
}]);
	
app.directive('backgroundImg', function() {
    return function(scope, element, attrs) {
        var url = attrs.backgroundImg;
        element.css({
        	'background-position': '50% 50%',
            'background-image': 'url('+url+')',
            'background-size': 'cover'
        });
    };
});