app.service('appuntiService', appuntiService);

function appuntiService($q, $http) {

	this.search = function(text) { 
		return $q(function(resolve, reject) {
			if (text != 'errore') {
				resolve({ 
					data: {
						appunti:[{
							appuntoId : '0',
							title : 'riccio molesto'
						},{
							appuntoId : '1',
							title : 'cinese molesto'
						}]
				}});
			} else {
				reject("Errore interno al server");
			}
		});
	}
	/*	TIRA FUORI LE MATERIE PER LA SEZIONE MATERIE... NON WORKA PERCHE' DICE CHE NON È UNA FUNZIONE :(
	this.getMaterie = function() { 
		return $q(function(resolve, reject) {
			if(resolve){
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
			}else{
				reject("Errore interno al server");
			}
		});
	}*/
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