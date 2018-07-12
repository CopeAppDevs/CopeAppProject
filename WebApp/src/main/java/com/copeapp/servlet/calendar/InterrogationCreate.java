package com.copeapp.servlet.calendar;

import com.copeapp.dao.calendar.InterrogationDAO;
import com.copeapp.dao.calendar.InterrogationDayDAO;
import com.copeapp.dao.commons.ClasseDAO;
import com.copeapp.dao.commons.StudentDAO;
import com.copeapp.dao.commons.UserDAO;
import com.copeapp.dto.calendar.InterrogationCreateDTO;
import com.copeapp.dto.calendar.InterrogationDayCreateDTO;
import com.copeapp.entities.calendar.Interrogation;
import com.copeapp.entities.calendar.InterrogationDay;
import com.copeapp.entities.common.Classe;
import com.copeapp.entities.common.User;
import com.copeapp.exception.CalendarException;
import com.copeapp.utilities.EntityManagerGlobal;
import com.copeapp.utilities.HttpStatusUtility;
import com.copeapp.utilities.MessageUtility;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class InterrogationCreate extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        User currentUser = UserDAO.selectByBasicAuthTokenException(request.getHeader("Authorization"));
        ObjectMapper om = new ObjectMapper();
        InterrogationCreateDTO interrogationreq = om.readValue(request.getInputStream(), InterrogationCreateDTO.class);

        Classe currentClasse = ClasseDAO.selectClasseById(interrogationreq.getClasseId());
        if (InterrogationDAO.canCreateInterrogation(currentUser, currentClasse,  interrogationreq.getSubject())) {
            Interrogation interrogation = new Interrogation();
            List<InterrogationDay> interrogationDays = new ArrayList<>();

            interrogation.setClasse(currentClasse);
            interrogation.setSubject(interrogationreq.getSubject());
            if (interrogationreq.getStartInterrogation().before(interrogationreq.getEndInterrogation())){
                interrogation.setStartInterrogation(interrogationreq.getStartInterrogation());
                interrogation.setEndInterrogation(interrogationreq.getEndInterrogation());
            } else {
                throw new CalendarException(HttpStatusUtility.NOT_ACCEPTABLE, MessageUtility.INVALID_DATE);
            }
            if (interrogationreq.getDaysBeforeClosing()>2){
                interrogation.setDaysBeforeClosing(interrogationreq.getDaysBeforeClosing());
            }  else {
                throw new CalendarException(HttpStatusUtility.NOT_ACCEPTABLE, MessageUtility.INVALID_NUMBER);
            }
            if (StudentDAO.isStudentsFromSameClass(interrogationreq.getStudentsInterrogated())){
                interrogation.setStudentsInterrogated(interrogationreq.getStudentsInterrogated());
            } else {
                throw new CalendarException(HttpStatusUtility.NOT_ACCEPTABLE, MessageUtility.INVALID_STUDENS); //TODO magari una user exception
            }

            for (InterrogationDayCreateDTO intDayCreate : interrogationreq.getDaysOfInterrogation()){
                interrogationDays.add(InterrogationDayDAO.createInterrogationDay(currentUser, intDayCreate.getEventDate(), intDayCreate.getStudetsInterrogated(),
                        interrogation.getSubject(), interrogation, intDayCreate.getMinInterrogated(), intDayCreate.getMaxInterrogated()));
            }
            interrogation.setDaysOfInterrogation(interrogationDays);

            EntityManagerGlobal.getEntityManager().getTransaction().begin();
            EntityManagerGlobal.getEntityManager().persist(interrogation);
            EntityManagerGlobal.getEntityManager().getTransaction().commit();
        } else {
            throw new CalendarException(HttpStatusUtility.UNAUTHORIZED, MessageUtility.UNAUTHORIZED);
        }
    }
}
