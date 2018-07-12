package com.copeapp.dao.commons;

import com.copeapp.entities.common.Classe;
import com.copeapp.entities.common.Student;
import com.copeapp.entities.common.User;
import com.copeapp.exception.CopeAppGenericException;
import com.copeapp.exception.InvalidAuthTokenException;
import com.copeapp.exception.LoginException;
import com.copeapp.utilities.EntityManagerGlobal;
import com.copeapp.utilities.HttpStatusUtility;
import com.copeapp.utilities.MessageUtility;

import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import java.util.Base64;
import java.util.List;

public class UserDAO {

	public static User selectByUsername(String username, String password) throws LoginException {

		TypedQuery<User> query = EntityManagerGlobal.getEntityManager()
				.createQuery("FROM User WHERE (username = :username OR mail = :username)", User.class);
		query.setParameter("username", username);
		User selectedUser;
		try {
			selectedUser = query.getSingleResult();
			if (selectedUser.getPassword().equals(password)) {
				return selectedUser;
			} else {
				throw new LoginException(HttpStatusUtility.UNAUTHORIZED, MessageUtility.WRONG_PASSWORD);
			}
		} catch (NoResultException nre) {
			throw new LoginException(HttpStatusUtility.UNAUTHORIZED, MessageUtility.WRONG_USERNAME, nre);
		}
	}

	public static User selectByBasicAuthTokenException(String authHeader) throws InvalidAuthTokenException {

		if (authHeader == null) {
			throw new InvalidAuthTokenException(HttpStatusUtility.UNAUTHORIZED, MessageUtility.INVALID_HEADER);
		}

		String token = new String(Base64.getDecoder().decode(authHeader));
		String[] tokens = token.split(":");
		if (tokens.length > 2) {
			throw new CopeAppGenericException(HttpStatusUtility.INTERNAL_SERVER_ERROR,
					" ':' presenti in username o password");
		}
		return selectByUsername(tokens[0], tokens[1]);
	}

	public static boolean isRappresentanteByClass(Student student, Classe classe){
		List<Student> rappresentanti = classe.getRappresentanti();
		return (rappresentanti.contains(student));
	}
}
