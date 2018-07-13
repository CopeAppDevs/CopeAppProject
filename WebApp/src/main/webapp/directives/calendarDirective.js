app.directive('mdCoolCalendar', ["$moment", "$anchorScroll", "$timeout", mdCoolCalendar]);

function mdCoolCalendar($moment, $anchorScroll, $timeout) {
	var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "directives/calendarDirective.html";
    directive.scope = {
    	events: "=calendarEvents",
    	lockViewType: "=",
    	openEvent: "&",
    	rest: "=restForEvents"
    }
    directive.link = function($scope, element, attrs) {
    	
    	if ($scope.calendarSpan == null || $scope.calendarSpan <= 3) {
    		$scope.calendarSpan = 6;
    	}
    	
    	var startDate;
    	var endDate;
    	if ($moment(new Date()).isBetween("01/09", "31/12")) {
    		startDate = $moment("01/09", "DD/MM");
    		endDate = startDate.add(1, "year");
    	} else {
    		var endDate = $moment("01/09", "DD/MM");
    		startDate = $moment("01/09", "DD/MM").subtract(1, "year");
    	}
    	
    	//richiesta al server degli eventi dell'anno
    	
    	//stickiness della barra del mese
    	$scope.setStickiness = function(type) {
    		if (type == "month") {
    			return {
    				position: "sticky",
    				top: "0px"
    			}
    		} else {
    			return undefined;
    		}
    	}
    	
    	$scope.scrollToToday = function() {
    		 $anchorScroll("day-"+$moment(new Date()).subtract(1, "d").format("DD/MM/YYYY"));
    	}
    	
    	$scope.calendar = [];
    	for (var day = startDate; day.isBefore(endDate); day = day.add(1, "day")) {
    		if (day.date() == 1) { //se è il primo di un mese allora aggiungi la header del mese
    			$scope.calendar.push({
    				type: "month",
    				name: $moment(day).format("MMMM"),
    				year: $moment(day).format("YYYY")
    			})
    		}
    		$scope.calendar.push({
    			type: "day",
    			day: $moment(day),
    			events: []
    		})
    		//trovare eventi per questa girnata
    	}
    	$timeout($scope.scrollToToday);
    }
    return directive;
}