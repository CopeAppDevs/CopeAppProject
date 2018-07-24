package com.copeapp.servlet.appunti;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.copeapp.dao.appunti.AppuntoDAO;
import com.copeapp.dao.commons.UserDAO;
import com.copeapp.dto.appunti.AppuntoDTO;
import com.copeapp.dto.appunti.AppuntoRequestByIdDTO;
import com.copeapp.dto.appunti.AppuntoResponseByIdDTO;
import com.copeapp.entities.appunti.Appunto;
import com.copeapp.entities.common.User;
import com.copeapp.utilities.DozerMapper;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/rest/appuntoId")
public class AppuntoByID extends HttpServlet{

	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		ObjectMapper om = new ObjectMapper();
		
		User currentUser = UserDAO.selectByBasicAuthTokenException(request.getHeader("Authorization"));
		
		AppuntoRequestByIdDTO appuntoRequestById = om.readValue(request.getInputStream(), AppuntoRequestByIdDTO.class);
		Appunto appunto = AppuntoDAO.getAppuntoById(appuntoRequestById.getAppuntoId());
		om.writeValue(response.getOutputStream(), new AppuntoResponseByIdDTO(DozerMapper.getMapper().map(appunto, AppuntoDTO.class)));
	}
}
