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