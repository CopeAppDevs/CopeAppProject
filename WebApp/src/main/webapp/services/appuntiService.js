app.service('appuntiService', appuntiService);

function appuntiService($q, $http) {

	this.search = function(text) { 
		return $q(function(resolve, reject) {
			if (text != 'errore') {
				resolve({ 
					data: {
						appunti:[{
							appuntoId : '0',
							titolo : 'riccio molesto',
							descrizione: "Una testo moltooooo lungo da scrivere",
							ownerId: '51',
							prof: 'Galletto',
							materia: 'Italiano',
							data: new Date()
								 
						},{
							appuntoId : '1',
							titolo : 'cinese molesto',
							descrizione: "Una testo moltooooo lungo da scrivere",
							ownerId: '52',
							prof: 'Maria',
							materia: 'Matematica',
							data: new Date()
						
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
							color: "f3f3f3f3"
						},
						title : 'riccio molesto',
						description: "Una testo moltooooo lungo da scrivere",
						likes: '51',
						dislikes: 'Galletto',
						dataCreazione: new Date(),
						classNumber: 5,
						section: 'A',
						indirizzo: 'Informatica',
						documento: "data:application/pdf;base64,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…"
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
								nome: 'Benassi'
							},{
								teacherId: '1',
								nome: 'Valzania'
							}]
				}});
				reject("Errore interno al server");
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