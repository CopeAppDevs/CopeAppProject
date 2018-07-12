package com.copeapp.dao.survey;

import com.copeapp.dto.survey.SurveyMiniDTO;
import com.copeapp.entities.common.Role;
import com.copeapp.entities.common.User;
import com.copeapp.entities.survey.Answer;
import com.copeapp.entities.survey.Survey;
import com.copeapp.entities.survey.Vote;
import com.copeapp.exception.SurveyException;
import com.copeapp.utilities.*;

import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SurveyDAO {

	public static boolean hasVoted (User currentUser, int surveyId) {
		TypedQuery<Long> query;
		query = EntityManagerGlobal.getEntityManager().createQuery(
				"SELECT COUNT(DISTINCT v) FROM Vote v INNER JOIN v.answer a INNER JOIN  v.user u INNER JOIN a.survey s WHERE (s.surveyId = :surveyId) AND ((u.userId = :userId))",
				Long.class);
		query.setParameter("surveyId", surveyId);
		query.setParameter("userId", currentUser.getUserId());
		return (query.getSingleResult() != 0);
	}
	
	public static Survey getSurveyById(int surveyId) {
		return EntityManagerGlobal.getEntityManager().find(Survey.class, surveyId);
	}

	public static void surveyDelete(int surveyId, User currentUser) {
		Survey survey = EntityManagerGlobal.getEntityManager().find(Survey.class, surveyId);
		if (survey == null) {
			throw new SurveyException(HttpStatusUtility.BAD_REQUEST, "Ci hai provato e hai fallito miseramente, BESTIA!");
		}
		if (MiscUtilities.isAdmin(currentUser.getRoles()) || survey.getInsertUser().equals(currentUser)) {
			survey.setDeleteDate(new Date());
			survey.setDeleteUser(currentUser);
		}
	}

	public static void surveyCreate(User currentUser, Survey survey) {
		boolean canAccess = false;
		for (Role r : currentUser.getRoles()) {
			if (r.getRole().equalsIgnoreCase("redattore") || r.getRole().equalsIgnoreCase("admin")) {
				canAccess = true;
			}
		}
		if (canAccess) {
			survey.setVoters(0);
			EntityManagerGlobal.getEntityManager().persist(survey);

		} else {
			throw new SurveyException(HttpStatusUtility.UNAUTHORIZED, MessageUtility.UNAUTHORIZED);
		}
	}
	
	public static void surveyUpdate(User currentUser, Survey survey) {
		Survey savedSurvey = EntityManagerGlobal.getEntityManager().find(Survey.class, survey.getSurveyId());
		if (savedSurvey != null) {
			Date currentDate = new Date();
			if (savedSurvey.getOpenSurveyDate().getTime() > currentDate.getTime()) {
				if (savedSurvey.getInsertUser().equals(currentUser) || MiscUtilities.isAdmin(currentUser.getRoles())) {
					EntityManagerGlobal.getEntityManager().remove(savedSurvey);
					survey.setSurveyId(null);
					for (Answer a : survey.getAnswers()) {
						a.setAnswerId(null);
						a.getAnswerContent().setAnswerContentId(null);
					}
					EntityManagerGlobal.getEntityManager().persist(survey);
				} else {
					throw new SurveyException(HttpStatusUtility.UNAUTHORIZED, MessageUtility.UNAUTHORIZED);
				}
			} else {
				throw new SurveyException(HttpStatusUtility.UNAUTHORIZED, "Non puoi modificare sondaggi già pubblicati");
			}
		} else {
			throw new SurveyException(HttpStatusUtility.BAD_REQUEST, "Non esistono sondaggi con questo id");
		}
	}

	public static ArrayList<SurveyMiniDTO> getSurveyMiniDTO(User currentUser, int lastSurveyNumber,
		int numberToRetrieve, boolean isMine, String filterKey, boolean isActive) {
		TypedQuery<Survey> query;
		if (!isMine) {
			String keyword = (filterKey.isEmpty()) ? "" : filterKey;
			String active = "<"; //abbasso gli operatori ternari
			if(isActive) {
				active = ">";
			}
			if (keyword.isEmpty()) {
				query = EntityManagerGlobal.getEntityManager()
						.createQuery("SELECT DISTINCT s FROM Survey s JOIN FETCH s.answers a WHERE (s.closeSurveyDate " + active
								+ " current_timestamp AND s.openSurveyDate < current_timestamp AND s.deleteDate is null) ORDER BY s.closeSurveyDate DESC",
								Survey.class);
			} else {
				query = EntityManagerGlobal.getEntityManager()
						.createQuery("SELECT DISTINCT s FROM Survey s JOIN FETCH s.answers a WHERE (s.closeSurveyDate " + active
								+ " current_timestamp AND s.openSurveyDate < current_timestamp AND s.deleteDate is null) LIKE :keyword ORDER BY s.closeSurveyDate DESC",
								Survey.class);
				query.setParameter("keyword", keyword);
			}
		} else {
			query = EntityManagerGlobal.getEntityManager().createQuery(
					"SELECT DISTINCT s FROM Survey s JOIN FETCH s.answers a WHERE (s.insertUser.userId = :userId AND s.deleteDate is null) ORDER BY s.closeSurveyDate DESC",
					Survey.class);
			query.setParameter("userId", currentUser.getUserId());
		}
		query.setFirstResult(lastSurveyNumber);
		query.setMaxResults(numberToRetrieve);
		List<Survey> surveys = query.getResultList();
		ArrayList<SurveyMiniDTO> miniDTO = new ArrayList<>();
		for (Survey s : surveys) {
			if (MiscUtilities.checkRoles(currentUser.getRoles(), s.getSurveyViewersRoles())) {
				miniDTO.add(DozerMapper.getMapper().map(s, SurveyMiniDTO.class));
			}
		}
		return miniDTO;
	}

	public static void voteSurvey(User currentUser, int surveyId, List<Integer> answersId) {
		Survey survey = getSurveyById(surveyId);
		if (survey == null) {
			throw new SurveyException(HttpStatusUtility.NOT_FOUND, MessageUtility.SURVEY_NOT_FOUND);
		}
		if (MiscUtilities.checkRoles(currentUser.getRoles(), survey.getSurveyVotersRoles())) {
			for (Integer aId : answersId) {
				Answer answer = EntityManagerGlobal.getEntityManager().find(Answer.class, aId);
				if (answer == null) {
					throw new SurveyException(HttpStatusUtility.NOT_FOUND, MessageUtility.SURVEY_NOT_FOUND);
				}
				answer.getVotes().add(new Vote(answer, currentUser));
				answer.setVotesNumber(answer.getVotesNumber()+1);
			}
			survey.setVoters(survey.getVoters()+1);
		}
	}
}
