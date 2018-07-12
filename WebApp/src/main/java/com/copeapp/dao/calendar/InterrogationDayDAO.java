package com.copeapp.dao.calendar;

import com.copeapp.dao.commons.TeacherDAO;
import com.copeapp.entities.calendar.Interrogation;
import com.copeapp.entities.calendar.InterrogationDay;
import com.copeapp.entities.common.*;
import com.copeapp.exception.CalendarException;
import com.copeapp.utilities.EntityManagerGlobal;
import com.copeapp.utilities.HttpStatusUtility;
import com.copeapp.utilities.MessageUtility;
import com.copeapp.utilities.MiscUtilities;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class InterrogationDayDAO {

    public static boolean isDayOpen(InterrogationDay interrogationDay){
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        c.add(Calendar.DATE,interrogationDay.getInterrogation().getDaysBeforeClosing());
        return (interrogationDay.getEventDate().before(c.getTime()) || interrogationDay.getStudentsInterrogated().size()<interrogationDay.getMaxInterrogated());
    }

    public static boolean isValidInterrogationDay(Interrogation interrogation, Date interrogationDate){
        Date startDate = interrogation.getStartInterrogation();
        Date endDate = interrogation.getEndInterrogation();
        return (startDate.compareTo(interrogationDate)>=0 && endDate.compareTo(interrogationDate)<=0);
    }

    public static InterrogationDay createInterrogationDay(User insertUser, Date eventDate, List<Student> studentsInterrogated, Subject subject,
                                                          Interrogation interrogation, Integer minInterrogated, Integer maxInterrogated){
        InterrogationDay interrogationDay = new InterrogationDay();
        interrogationDay.setInsertUser(insertUser);
        interrogationDay.setSubject(subject);
        interrogationDay.setInterrogation(interrogation);
        interrogationDay.setInsertDate(new Date());
        interrogationDay.setType("interrogationday");

        List<Role> targetRole = new ArrayList<>();
        targetRole.add(new Role("studente", "Studente"));
        targetRole.add(new Role("prof", "Professore"));
        interrogationDay.setDestinationRoles(targetRole);

        List<Classe> targetClasse = new ArrayList<>();
        targetClasse.add(studentsInterrogated.get(0).getClasse());
        interrogationDay.setDestinationClasses(targetClasse);

        if (isValidInterrogationDay(interrogation, eventDate)){
            interrogationDay.setEventDate(eventDate);
        } else {
            throw new CalendarException(HttpStatusUtility.NOT_ACCEPTABLE, MessageUtility.INVALID_DATE);
        }
        if (minInterrogated>0 && maxInterrogated>=minInterrogated){
            interrogationDay.setMinInterrogated(minInterrogated);
            interrogationDay.setMaxInterrogated(maxInterrogated);
        } else {
            throw new CalendarException(HttpStatusUtility.NOT_ACCEPTABLE, MessageUtility.INVALID_NUMBER);
        }
        if (maxInterrogated>=studentsInterrogated.size() && InterrogationDAO.isValidStudent(interrogation, studentsInterrogated)){
            interrogationDay.setStudentsInterrogated(studentsInterrogated);
        } else {
            throw new CalendarException(HttpStatusUtility.NOT_ACCEPTABLE, MessageUtility.INVALID_STUDENS);
        }
        return interrogationDay;
    }

    public static boolean canLeave(Student student, InterrogationDay interrogationday){
        return (interrogationday.getStudentsInterrogated().contains(student)
                && interrogationday.getStudentsInterrogated().size()>interrogationday.getMinInterrogated());
    }

    public static void addStudent(Student student, InterrogationDay interrogationDay, User currentUser){
        InterrogationDay savedInterrogationDay = EntityManagerGlobal.getEntityManager().find(InterrogationDay.class, interrogationDay.getEventId());
        if (savedInterrogationDay != null) {
            if (!(interrogationDay.getStudentsInterrogated().contains(student))
                    && interrogationDay.getStudentsInterrogated().size()<interrogationDay.getMaxInterrogated() && isDayOpen(interrogationDay)
                    && student.getClasse().equals(interrogationDay.getInterrogation().getClasse())){
                if (InterrogationDAO.canCreateInterrogation(currentUser, interrogationDay.getInterrogation().getClasse(), interrogationDay.getSubject())
                        || student.equals(currentUser)) { //TODO i rappresentanti possono aggiungere?
                    EntityManagerGlobal.getEntityManager().remove(savedInterrogationDay);
                    interrogationDay.setEventId(null);
                    interrogationDay.setInsertDate(new Date());
                    interrogationDay.setInsertUser(currentUser);
                    List<Student> newList = interrogationDay.getStudentsInterrogated();
                    newList.add(student);
                    interrogationDay.setStudentsInterrogated(newList);
                    EntityManagerGlobal.getEntityManager().persist(interrogationDay);
                } else {
                    throw new CalendarException(HttpStatusUtility.UNAUTHORIZED, MessageUtility.UNAUTHORIZED);
                }
            } else {
                throw new CalendarException(HttpStatusUtility.NOT_ACCEPTABLE, MessageUtility.INVALID);
            }
        } else {
            throw new CalendarException(HttpStatusUtility.NOT_FOUND, MessageUtility.EVENT_NOT_FOUND);
        }
    }

    public static void removeStudent(Student student, InterrogationDay interrogationDay, User currentUser){
        InterrogationDay savedInterrogationDay = EntityManagerGlobal.getEntityManager().find(InterrogationDay.class, interrogationDay.getEventId());
        if (savedInterrogationDay !=null) {
            if (interrogationDay.getStudentsInterrogated().size()>interrogationDay.getMinInterrogated()
                    && interrogationDay.getStudentsInterrogated().contains(student)){
                if (student.equals(currentUser) || MiscUtilities.isAdmin(currentUser.getRoles()) ||
                        TeacherDAO.isUserTeacherOfClass(currentUser, interrogationDay.getInterrogation().getClasse())){
                    EntityManagerGlobal.getEntityManager().remove(savedInterrogationDay);
                    interrogationDay.setEventId(null);
                    interrogationDay.setInsertDate(new Date());
                    interrogationDay.setInsertUser(currentUser);
                    List<Student> newList = interrogationDay.getStudentsInterrogated();
                    newList.remove(student);
                    interrogationDay.setStudentsInterrogated(newList);
                    EntityManagerGlobal.getEntityManager().persist(interrogationDay);
                } else {
                    throw new CalendarException(HttpStatusUtility.UNAUTHORIZED, MessageUtility.UNAUTHORIZED);
                }
            } else {
                throw new CalendarException(HttpStatusUtility.NOT_ACCEPTABLE, MessageUtility.INVALID);
            }
        } else {
            throw new CalendarException(HttpStatusUtility.NOT_FOUND, MessageUtility.EVENT_NOT_FOUND);
        }
    }

}
