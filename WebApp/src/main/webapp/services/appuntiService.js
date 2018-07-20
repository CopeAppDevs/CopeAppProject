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
						documento: 'AUDJOWANBUDHAWDGAH'
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
	this.teacherList = function() { 
		return $q(function(resolve, reject) {
				resolve({ 
					data: {
						teachers:[
							{
								teacherId: '0',
								cognome: 'Benassi'
							},{
								teacherId: '1',
								cognome: 'Valzania'
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