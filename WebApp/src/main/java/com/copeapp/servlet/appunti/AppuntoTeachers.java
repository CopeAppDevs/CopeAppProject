package com.copeapp.servlet.appunti;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.copeapp.dao.commons.TeacherDAO;
import com.copeapp.dao.commons.UserDAO;
import com.copeapp.dto.appunti.AppuntiRequestTeacherListDTO;
import com.copeapp.dto.appunti.AppuntiResponseTeacherListDTO;
import com.copeapp.dto.commons.TeacherDTO;
import com.copeapp.entities.common.Teacher;
import com.copeapp.entities.common.User;
import com.copeapp.utilities.DozerMapper;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/rest/appuntoTeachers")
public class AppuntoTeachers extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		ObjectMapper om = new ObjectMapper();
		
		User currentUser = UserDAO.selectByBasicAuthTokenException(request.getHeader("Authorization"));
		
		AppuntiRequestTeacherListDTO appuntoTeacherListRequest = om.readValue(request.getInputStream(), AppuntiRequestTeacherListDTO.class);
		List<Teacher> teacherList = TeacherDAO.getAllTeacher(currentUser, appuntoTeacherListRequest.isMine(), appuntoTeacherListRequest.getText());
		om.writeValue(response.getOutputStream(), new AppuntiResponseTeacherListDTO(DozerMapper.map(teacherList, TeacherDTO.class)));
	}
}
