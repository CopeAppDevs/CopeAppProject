
package com.copeapp.servlet.survey;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.copeapp.dao.commons.UserDAO;
import com.copeapp.dao.survey.SurveyDAO;
import com.copeapp.dto.survey.SurveyDTO;
import com.copeapp.dto.survey.SurveyRequestByIdDTO;
import com.copeapp.dto.survey.SurveyResponseByIdDTO;
import com.copeapp.entities.common.User;
import com.copeapp.entities.survey.Survey;
import com.copeapp.exception.SurveyException;
import com.copeapp.utilities.DozerMapper;
import com.copeapp.utilities.HttpStatusUtility;
import com.copeapp.utilities.MessageUtility;
import com.copeapp.utilities.MiscUtilities;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/rest/surveybyid")
public class SurveyById extends HttpServlet{

	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		ObjectMapper objMap = new ObjectMapper();
		SurveyRequestByIdDTO surveyRequestById = objMap.readValue(request.getInputStream(), SurveyRequestByIdDTO.class);
		User currentUser = UserDAO.selectByBasicAuthTokenException(request.getHeader("Authorization"));
		Survey requiredSurvey = SurveyDAO.getSurveyById(surveyRequestById.getSurveyId());  //igniorante
		if (requiredSurvey == null) {
			throw new SurveyException(HttpStatusUtility.NOT_FOUND, MessageUtility.SURVEY_NOT_FOUND);
		}
		
		SurveyResponseByIdDTO responseDTO;
		if (MiscUtilities.checkRoles(currentUser.getRoles(), requiredSurvey.getSurveyViewersRoles())) {
			responseDTO = new SurveyResponseByIdDTO(DozerMapper.getMapper().map(requiredSurvey, SurveyDTO.class), false);
			if(SurveyDAO.hasVoted(currentUser, surveyRequestById.getSurveyId()) || !MiscUtilities.checkRoles(currentUser.getRoles(), requiredSurvey.getSurveyVotersRoles())) {
				responseDTO.setHasVoted(true);
			}
			response.setStatus(HttpStatusUtility.OK);
		} else {
			throw new SurveyException(HttpStatusUtility.UNAUTHORIZED, MessageUtility.UNAUTHORIZED);
		}
		objMap.writeValue(response.getOutputStream(),responseDTO);
	}
}

