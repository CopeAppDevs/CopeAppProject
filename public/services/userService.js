app.service('UserService', UserService);

function UserService($q, $http) {

//	this.login = function(mail, password) { //togliere per attivare la login
//		return $q(function(resolve, reject) {
//			if (mail != 'errore@gmail.com') {
//				resolve({ 
//					data: {
//						user:{
//							userId : '0',
//							mail : 'cerammerda@gioli.it',
//							firstname : 'Luca',
//							lastname : 'Ceragioli',
//							username : 'Cerammerda',
//							password : 'vinciogay',
//							roles : [{roleId: 0, role: 'studente', description: 'studio per vivere'},{roleId: 1, role: 'moderatore', description:'studio e posso mutare le persone'},{roleId: 2, role: 'admin', description:'amministro'}],
//							imageUrl : 'Cerammerda',
//							wallpaper : 'default',
//							firstEntry: false //mettere su true per mostrare la pagina di first entry
//						}}});
//			} else {
//				reject("Errore interno al server");
//			}
//		});
//	}
	
	this.login = function(mail,password) {  //mettere per attivare la login
		var loginDTO = new Object();
		loginDTO.mail = mail;
		loginDTO.password = password;
		var req = {
				method: 'POST',
				url: 'http://localhost:8080/CopeApp/rest/login',
				headers: {
					'Content-Type': "application/json"
				},
				data: loginDTO
		}
		return $http(req);
	}

}