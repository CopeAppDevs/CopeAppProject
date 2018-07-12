app.config(function($stateProvider){
	$stateProvider.state("news", {
		url:"/news",
		templateUrl:"news/news.html"
	})
});
app.controller("NewsCtrl", NewsCtrl);
function NewsCtrl($scope){

}