package com.copeapp.servlet.appunti;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.copeapp.dao.commons.SubjectDAO;
import com.copeapp.dao.commons.UserDAO;
import com.copeapp.dto.appunti.AppuntiRequestSubjectListDTO;
import com.copeapp.dto.appunti.AppuntiResponseSubjectListDTO;
import com.copeapp.dto.commons.SubjectDTO;
import com.copeapp.entities.common.Subject;
import com.copeapp.entities.common.User;
import com.copeapp.utilities.DozerMapper;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/rest/appuntoSubject")
public class AppuntoSubjects extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		ObjectMapper om = new ObjectMapper();
		
		User currentUser = UserDAO.selectByBasicAuthTokenException(request.getHeader("Authorization"));
		
		AppuntiRequestSubjectListDTO appuntoSubjectListRequest = om.readValue(request.getInputStream(), AppuntiRequestSubjectListDTO.class);
		List<Subject> subjectList = SubjectDAO.getAllSubject(currentUser, appuntoSubjectListRequest.isMine(), appuntoSubjectListRequest.getText());
		om.writeValue(response.getOutputStream(), new AppuntiResponseSubjectListDTO(DozerMapper.map(subjectList, SubjectDTO.class)));
	}
}
