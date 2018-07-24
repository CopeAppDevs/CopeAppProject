app.service('appuntiService', appuntiService);

function appuntiService($q, $http) {
	
	this.search = function(user, xtext, xmine, xlastNumber, xnumberToRetrive) { 
		var req = {
				method: 'POST',
				url: 'http://localhost:8080/CopeApp/rest/appuntoList',
				headers: {
					'Content-Type': "application/json",
					'Authorization': btoa(user.mail+":"+user.password)
				},
				data: {
					mine: xmine,
				
					text: xtext,
					
					lastAppuntoNumber: xlastNumber,
				
					numberToRetrieve: xnumberToRetrive
					
				}
		}
		return $http(req);
	}

//	this.search = function(text) { 
//		return $q(function(resolve, reject) {
//			if (text != 'errore') {
//				resolve({ 
//					data: {
//						appunti:[{
//							appuntoId : '0',
//							titolo : 'Lorem ipsum dolor sit amet, consectetur cras amet.',
//							descrizione: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id diam velit. Ut fringilla aliquam commodo. Praesent ultricies turpis ut imperdiet semper. Curabitur ullamcorper tristique enim ut congue. Pellentesque quis dolor urna. Sed ligula urna metus.",
//							teacher:{
//								userId: 1,
//								firstname: "Sandro",
//								lastname: "Corvino",
//							},
//							subject:{
//								subjectId: 2,
//								name: "Informatica",
//								color: "red"
//							},
//							title : 'Lorem ipsum dolor sit amet, consectetur cras amet.',
//							description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nulla eros, mollis ac interdum sed, mattis eget eros. Phasellus quis ultricies nibh. Mauris gravida suscipit augue id lacinia. Donec vitae lectus auctor, ultrices leo at, bibendum elit cras amet.",
//							likes: '10',
//							dislikes: '1',
//							dataCreazione: new Date()
//								 
//						},{
//							appuntoId : '1',
//							titolo : 'Lorem ipsum dolor sit amet, consectetur cras amet.',
//							descrizione: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis ut nulla ut vehicula. Nulla vel justo massa. Fusce ultricies laoreet enim, in sagittis elit interdum at. Nullam non urna eros. Lorem ipsum dolor sit amet, consectetur adipiscing nullam.",
//							teacher:{
//								userId: 1,
//								firstname: "Sandro",
//								lastname: "Corvino",
//							},
//							subject:{
//								subjectId: 2,
//								name: "Informatica",
//								color: "red"
//							},
//							title : 'Lorem ipsum dolor sit amet, consectetur cras amet.',
//							description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nulla eros, mollis ac interdum sed, mattis eget eros. Phasellus quis ultricies nibh. Mauris gravida suscipit augue id lacinia. Donec vitae lectus auctor, ultrices leo at, bibendum elit cras amet.",
//							likes: '51',
//							dislikes: '10',
//							dataCreazione: new Date()
//						
//						}]
//				}});
//			} else {
//				reject("Errore interno al server");
//			}
//		});
//	}
	
	this.getAppunto = function(id){
		return $q(function(resolve, reject) {
			resolve({ 
				data: {
					appunto:{
						appuntoId : '0',
						student: {
							classe: {
								classId: 50,
								number: 4,
								section: 'A',
								indirizzo: "Informatica",
								students: null, //perchè non verrà mai usato.
								rappresentanti: null, //same
								teachers: null, // same
								coordinator: null
							},
							//gli elementi mancanti non li ho messi dato che non li uso...
							userId: 1,
							username: "RiccioMolesto",
							firstname: "Riccio",
							lastname: "TroppoMolesto",
							imageUrl: "https://openclipart.org/download/292749/abstract-icon.svg"
						},
						teacher:{
							userId: 1,
							firstname: "Sandro",
							lastname: "Corvino",
						},
						subject:{
							subjectId: 2,
							name: "Informatica",
							color: "red"
						},
						title : 'Lorem ipsum dolor sit amet, consectetur cras amet.',
						description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nulla eros, mollis ac interdum sed, mattis eget eros. Phasellus quis ultricies nibh. Mauris gravida suscipit augue id lacinia. Donec vitae lectus auctor, ultrices leo at, bibendum elit cras amet.",
						likes: '51',
						dislikes: '10',
						dataCreazione: new Date(),
						classNumber: 5,
						section: 'A',
						indirizzo: 'Informatica',
						documento: "data:application/pdf;base64,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"
						}
			}});
		});
		
	}
	
	this.getMaterie = function(user, xmine, xtext) { 
		var req = {
				method: 'POST',
				url: 'http://localhost:8080/CopeApp/rest/appuntoSubjects',
				headers: {
					'Content-Type': "application/json",
					'Authorization': btoa(user.mail+":"+user.password)
				},
				data: {
					mine: xmine,
				
					text: xtext
				}
		}
		return $http(req);
	}
	
	this.teacherList = function(user, xmine, xtext) { 
		var req = {
				method: 'POST',
				url: 'http://localhost:8080/CopeApp/rest/appuntoTeachers',
				headers: {
					'Content-Type': "application/json",
					'Authorization': btoa(user.mail+":"+user.password)
				},
				data: {
					mine: xmine,
				
					text: xtext,
				}
		}
		return $http(req);
	
	}
	
	this.uploadAppunto = function(user, appunto, update) {
		if (update) {
			var req = {
					method: 'POST',
					url: 'http://localhost:8080/CopeApp/rest/appuntoupdate',
					headers: {
						'Content-Type': "application/json",
						'Authorization': btoa(user.mail+":"+user.password)
					},
					data: {appuntoDTO: appunto}
			}
		} else {
			var req = {
					method: 'POST',
					url: 'http://localhost:8080/CopeApp/rest/appuntoCreate',
					headers: {
						'Content-Type': "application/json",
						'Authorization': btoa(user.mail+":"+user.password)
					},
					data: {appuntoDTO: appunto}
			}
		}
		return $http(req);
	}
	
//	
//	this.login = function(mail,password) {  //mettere per attivare la login
//		var loginDTO = new Object();
//		loginDTO.mail = mail;
//		loginDTO.password = password;
//		var req = {
//				method: 'POST',
//				url: 'http://localhost:8080/CopeApp/rest/login',
//				headers: {
//					'Content-Type': "application/json"
//				},
//				data: loginDTO
//		}
//		return $http(req);
//	}
//
}