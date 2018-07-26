package com.copeapp.dao.appunti;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.TypedQuery;

import com.copeapp.dto.appunti.AppuntoDTO;
import com.copeapp.dto.appunti.AppuntoMiniDTO;
import com.copeapp.entities.appunti.Appunto;
import com.copeapp.entities.common.User;
import com.copeapp.exception.SurveyException;
import com.copeapp.utilities.DozerMapper;
import com.copeapp.utilities.EntityManagerGlobal;
import com.copeapp.utilities.HttpStatusUtility;

public class AppuntoDAO {

	public static Appunto getAppuntoById(int appuntoId) {
		return EntityManagerGlobal.getEntityManager().find(Appunto.class, appuntoId);
	}
	//
	// public static void surveyDelete(int surveyId, User currentUser) {
	// Survey survey = EntityManagerGlobal.getEntityManager().find(Survey.class,
	// surveyId);
	// if (survey == null) {
	// throw new SurveyException(HttpStatusUtility.BAD_REQUEST, "Ci hai provato e
	// hai fallito miseramente, BESTIA!");
	// }
	// if (MiscUtilities.isAdmin(currentUser.getRoles()) ||
	// survey.getInsertUser().equals(currentUser)) {
	// survey.setDeleteDate(new Date());
	// survey.setDeleteUser(currentUser);
	// }
	// }

	public static void appuntoCreate(User currentUser, Appunto appunto) {
		EntityManagerGlobal.getEntityManager().persist(appunto);
	}

	public static void appuntoUpdate(User currentUser, Appunto appunto) {
		Appunto savedAppunto = EntityManagerGlobal.getEntityManager().find(Appunto.class, appunto.getAppuntoId());
		if (savedAppunto != null) {
			EntityManagerGlobal.getEntityManager().persist(appunto);
		} else {
			throw new SurveyException(HttpStatusUtility.BAD_REQUEST, "Non esistono appunti con questo id");
		}
	}

	public static ArrayList<AppuntoMiniDTO> getAppuntiMiniDTO(User currentUser, int lastAppuntoNumber,
			int numberToRetrieve, boolean isMine, String text) {
		TypedQuery<Appunto> query;
		if (!isMine) {

			if (text == null || text.isEmpty()) {
				query = EntityManagerGlobal.getEntityManager()
						.createQuery("SELECT DISTINCT s FROM Appunto s ORDER BY s.appuntoId DESC", Appunto.class);
			} else {
				query = EntityManagerGlobal.getEntityManager().createQuery(
						"SELECT DISTINCT s FROM Appunto s WHERE upper(s.title) LIKE :text ORDER BY s.appuntoId DESC",
						Appunto.class);
				query.setParameter("text", "%" +text.toUpperCase()+ "%");
			}
		} else {
			query = EntityManagerGlobal.getEntityManager().createQuery(
					"SELECT DISTINCT s FROM Appunto s WHERE s.student.userId = :userId ORDER BY s.appuntoId DESC",
					Appunto.class);
			query.setParameter("userId", currentUser.getUserId());
		}
		query.setFirstResult(lastAppuntoNumber);
		query.setMaxResults(numberToRetrieve);
		List<Appunto> appunti = query.getResultList();
		ArrayList<AppuntoMiniDTO> miniDTO = new ArrayList<>();
		for (Appunto s : appunti) {
			miniDTO.add(DozerMapper.getMapper().map(s, AppuntoMiniDTO.class));
		}
		return miniDTO;
	}

	public static ArrayList<AppuntoMiniDTO> getAppuntiMiniDTO(User currentUser, Integer idMateria) {
		TypedQuery<Appunto> query;
		query = EntityManagerGlobal.getEntityManager().createQuery(
				"SELECT DISTINCT s FROM Appunto s WHERE subject_subjectId = :id ORDER BY s.appuntoId DESC", Appunto.class);
		query.setParameter("id", idMateria);

		List<Appunto> appunti = query.getResultList();
		ArrayList<AppuntoMiniDTO> miniDTO = new ArrayList<>();
		for (Appunto s : appunti) {
			miniDTO.add(DozerMapper.getMapper().map(s, AppuntoMiniDTO.class));
		}
		return miniDTO;
	}
	

	public static void delateAppunto(User currentUser, Integer idAppunto) {
		
	}
	

}
