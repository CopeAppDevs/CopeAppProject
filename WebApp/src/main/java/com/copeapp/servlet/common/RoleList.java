package com.copeapp.servlet.common;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.copeapp.dao.commons.RoleDAO;
import com.copeapp.dto.commons.RoleListDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/rest/roleList")
public class RoleList extends HttpServlet{

	private static final long serialVersionUID = 1L;

	public RoleList() {}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setHeader("Content-Type", "application/json");
		ObjectMapper om = new ObjectMapper();
		
		om.writeValue(response.getOutputStream(), new RoleListDTO(RoleDAO.getRolesList()));
		
	}
	
}
