package com.copeapp.servlet.appunti;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.copeapp.dao.appunti.AppuntoDAO;
import com.copeapp.dao.appunti.LikerDAO;
import com.copeapp.dao.commons.UserDAO;
import com.copeapp.dto.appunti.AppuntoRequestVoteDTO;
import com.copeapp.dto.appunti.AppuntoResponseVoteDTO;
import com.copeapp.entities.appunti.Appunto;
import com.copeapp.entities.appunti.Liker;
import com.copeapp.entities.common.User;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/rest/appuntoVote")
public class AppuntoVote extends HttpServlet {

	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		User currentUser = UserDAO.selectByBasicAuthTokenException(request.getHeader("Authorization"));

		ObjectMapper om = new ObjectMapper();

		AppuntoRequestVoteDTO appuntoVoteRequest = om.readValue(request.getInputStream(), AppuntoRequestVoteDTO.class);

		LikerDAO.updateLikers(currentUser, appuntoVoteRequest.getAppuntoId(), appuntoVoteRequest.isVote());

		Appunto appunto = AppuntoDAO.getAppuntoById(appuntoVoteRequest.getAppuntoId());
		Liker liker = LikerDAO.getLikerByAppuntoId(currentUser, appuntoVoteRequest.getAppuntoId());
		Boolean yourVote = null;
		if (liker != null) {
			yourVote =liker.isLiked();
		}
		om.writeValue(response.getOutputStream(), new AppuntoResponseVoteDTO(appunto.getLikes(), appunto.getDislikes(), yourVote));
	}
}
