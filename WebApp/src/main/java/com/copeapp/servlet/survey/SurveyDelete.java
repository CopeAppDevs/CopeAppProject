package com.copeapp.servlet.survey;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.copeapp.dao.commons.UserDAO;
import com.copeapp.dao.survey.SurveyDAO;
import com.copeapp.dto.survey.SurveyRequestDeleteDTO;
import com.copeapp.entities.common.User;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/rest/surveydelete")
public class SurveyDelete extends HttpServlet{

	private static final long serialVersionUID = 1L;

	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		User currentUser = UserDAO.selectByBasicAuthTokenException(request.getHeader("Authorization"));
		ObjectMapper om = new ObjectMapper();
		SurveyRequestDeleteDTO surveyRequest = om.readValue(request.getInputStream(), SurveyRequestDeleteDTO.class);
		SurveyDAO.surveyDelete(surveyRequest.getSurveyId(), currentUser);	
	}
}
