app.directive('mdCoolCalendar', ["$moment", "$anchorScroll", "$timeout", mdCoolCalendar]);

function mdCoolCalendar($moment, $anchorScroll, $timeout) {
	var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "directives/calendarDirective.html";
    directive.scope = {
    	events: "=calendarEvents",
    	lockViewType: "=",
    	openEvent: "&",
       	mode: "=viewMode",
    	//rest: "=restForEvents",	//evitabile mettendo il tipo di eventi
    	canEdit: "="		//passare true se l'utente puù efitare le interrogazioni
    	//eventType: "="		//forse conviene passare anche il tipo di evento, per evitare di dover inviare gli eventi completi di tutto l'anno
    }
    
    
    //creare un oggetto defaults della directive
    
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
    	
    	
    	$scope.fallbackDefault = function() {
        	if(typeof $scope.lockViewType == "undefined") {$scope.lockViewType = false}
        	if(typeof $scope.openEvent == "undefined") {$scope.openEvent = false}
        	if(typeof $scope.mode == "undefined") {$scope.mode = "days"}
        	//if(typeof $scope.rest == "undefined") {$scope.rest = ""}
        	if(typeof $scope.canEdit !== "boolean") {$scope.canEdit = false}		
    	}
    	
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
    	
    	//funzioni di vista
    	
    	$scope.scrollToToday = function() {
    		console.log("back to today");
    		$anchorScroll("day-"+$moment(new Date()).subtract(1, "d").format("DD/MM/YYYY"));
    	}
    	
    	$scope.modes = ['days', 'month'];
    	$scope.defaultViewMode =  'days';
    	$scope.activeMode;
    	
    	$scope.setViewMode = function(mode) {
    		if($scope.modes.indexOf(mode)==-1) {
    			$scope.activeMode = $scope.defaultViewMode;
    		} else {
    			console.log("view mode set to: " + mode);
    			$scope.activeMode = mode;
    		}
    		//timeout aspetta finchè il dom non è caricato del tutto
    		$timeout($scope.scrollToToday);
    	}

    	
    	//eventi in un giorno
    	$scope.eventsIn = function(day) {
    		todayEvents = [];
	    	for(var i = 0; i < $scope.events.length; i++) {
	    		event = $scope.events[i];
	    		if ($moment(event.eventDate).startOf('day').isSame($moment(day).startOf('day'))) {
	    			todayEvents.push(event);
	    			console.log(event);
	    		}
	    	}
    		return(todayEvents);
    	}
    	
    	
    	//creazione vista per giorni
    	
    	$scope.calendar = [];
    	$scope.loadDays = function() {
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
	    			events: $scope.eventsIn(day)
	    		})
	    	}
	    	console.log("days loaded");
    	}
    	$scope.fallbackDefault();
    	$scope.setViewMode($scope.mode);
    	$scope.loadDays();
    	//creazione vista per mesi
    	
    }
    return directive;
}