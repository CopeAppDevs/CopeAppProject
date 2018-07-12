package com.copeapp.servlet.calendar;

import com.copeapp.dao.calendar.InterrogationDayDAO;
import com.copeapp.dao.commons.UserDAO;
import com.copeapp.dto.calendar.updateInterrogationDayStudentDTO;
import com.copeapp.entities.common.User;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/rest/updateInterrogationDayStudent")
public class updateInterrogationDayStudent extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        User currentUser = UserDAO.selectByBasicAuthTokenException(request.getHeader("Authorization"));
        ObjectMapper om = new ObjectMapper();
        updateInterrogationDayStudentDTO interrogationreq = om.readValue(request.getInputStream(), updateInterrogationDayStudentDTO.class);
        if (interrogationreq.getAdd()){
            InterrogationDayDAO.addStudent(interrogationreq.getStudent(), interrogationreq.getInterrogationDay(), currentUser);
        } else {
            InterrogationDayDAO.removeStudent(interrogationreq.getStudent(), interrogationreq.getInterrogationDay(), currentUser);
        }
        //om.writeValue(response.getOutputStream(), new InterrogationDayDTO(DozerMapper.getMapper().map();));
    }
}
