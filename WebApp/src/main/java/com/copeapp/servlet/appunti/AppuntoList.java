package com.copeapp.servlet.appunti;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.copeapp.dao.appunti.AppuntoDAO;
import com.copeapp.dao.commons.UserDAO;
import com.copeapp.dto.appunti.AppuntiRequestListDTO;
import com.copeapp.dto.appunti.AppuntiResponseListDTO;
import com.copeapp.dto.appunti.AppuntoMiniDTO;
import com.copeapp.entities.common.User;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/rest/appuntoList")
public class AppuntoList extends HttpServlet{

	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		ObjectMapper om = new ObjectMapper();
		
		User currentUser = UserDAO.selectByBasicAuthTokenException(request.getHeader("Authorization"));
		
		AppuntiRequestListDTO appuntoListRequest = om.readValue(request.getInputStream(), AppuntiRequestListDTO.class);
		ArrayList<AppuntoMiniDTO> appuntiMini = AppuntoDAO.getAppuntiMiniDTO(currentUser, appuntoListRequest.getLastAppuntoNumber(), appuntoListRequest.getNumberToRetrieve(), appuntoListRequest.isMine(), appuntoListRequest.getText());
		om.writeValue(response.getOutputStream(), new AppuntiResponseListDTO(appuntiMini));
	}
}
