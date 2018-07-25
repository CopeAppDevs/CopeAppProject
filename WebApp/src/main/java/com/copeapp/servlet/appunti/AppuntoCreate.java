package com.copeapp.servlet.appunti;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.copeapp.dao.appunti.AppuntoDAO;
import com.copeapp.dao.commons.UserDAO;
import com.copeapp.dto.appunti.AppuntoDTO;
import com.copeapp.dto.appunti.AppuntoRequestCreateDTO;
import com.copeapp.dto.appunti.AppuntoResponseCreateDTO;
import com.copeapp.entities.appunti.Appunto;
import com.copeapp.entities.common.Student;
import com.copeapp.entities.common.User;
import com.copeapp.utilities.DozerMapper;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/rest/appuntoCreate")
public class AppuntoCreate extends HttpServlet{

	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		User currentUser = UserDAO.selectByBasicAuthTokenException(request.getHeader("Authorization"));
		
		ObjectMapper om = new ObjectMapper();
		
		AppuntoRequestCreateDTO appuntoRequest = om.readValue(request.getInputStream(), AppuntoRequestCreateDTO.class);
		Appunto appunto = DozerMapper.getMapper().map(appuntoRequest.getAppuntoDTO(), Appunto.class);
		appunto.setStudent((Student)currentUser);
		appunto.setDataCreazione(new Date());
		AppuntoDAO.appuntoCreate(currentUser, appunto);
		
		om.writeValue(response.getOutputStream(), new AppuntoResponseCreateDTO(DozerMapper.getMapper().map(appunto, AppuntoDTO.class)));

	}
}
