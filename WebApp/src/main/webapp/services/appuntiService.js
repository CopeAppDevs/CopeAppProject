app.service('appuntiService', appuntiService);

function appuntiService($q, $http) {

	this.search = function(text) { 
		return $q(function(resolve, reject) {
			if (text != 'errore') {
				resolve({ 
					data: {
						appunti:[{
							appuntoId : '0',
							titolo : 'Lorem ipsum dolor sit amet, consectetur cras amet.',
							descrizione: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id diam velit. Ut fringilla aliquam commodo. Praesent ultricies turpis ut imperdiet semper. Curabitur ullamcorper tristique enim ut congue. Pellentesque quis dolor urna. Sed ligula urna metus.",
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
							likes: '10',
							dislikes: '1',
							dataCreazione: new Date()
								 
						},{
							appuntoId : '1',
							titolo : 'Lorem ipsum dolor sit amet, consectetur cras amet.',
							descrizione: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis ut nulla ut vehicula. Nulla vel justo massa. Fusce ultricies laoreet enim, in sagittis elit interdum at. Nullam non urna eros. Lorem ipsum dolor sit amet, consectetur adipiscing nullam.",
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
							dataCreazione: new Date()
						
						}]
				}});
			} else {
				reject("Errore interno al server");
			}
		});
	}
	
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
	
	this.getMaterie = function() { 
		return $q(function(resolve, reject) {
				resolve({ 
					data: {
						materie:[{
							materiaId : '0',
							nome : 'Matematica'
						},{
							materiaId : '1',
							nome : 'Italiano'
						}]
				}});
		});
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