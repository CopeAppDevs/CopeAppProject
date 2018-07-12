package com.copeapp.dao.calendar;

import com.copeapp.dao.commons.UserDAO;
import com.copeapp.entities.calendar.Interrogation;
import com.copeapp.entities.calendar.InterrogationDay;
import com.copeapp.entities.common.*;
import com.copeapp.utilities.MiscUtilities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class InterrogationDAO {

    public static List<Student> selectInterrogatedStudentsByDay(Interrogation interrogation, Date date){
        List<Student> listStudent = new ArrayList<>();
        for (InterrogationDay d : interrogation.getDaysOfInterrogation()){
            if (d.getEventDate().equals(date)) { //TODO == oppure .equals()
                return d.getStudentsInterrogated();
            }
        }
        return listStudent;
    }

    public static boolean isValidStudent(Interrogation interrogation, List<Student> student){ //TODO gli studenti che sono già stati interrogati in un giorno precedente
        return !(student.retainAll(interrogation.getStudentsInterrogated())); //TODO dovrebbe andare
    }

    public static boolean canCreateInterrogation(User user, Classe classe, Subject subject){
        List<Role> roles = user.getRoles();
        if (MiscUtilities.isAdmin(roles)){
            return true;
        } else if (MiscUtilities.isRole(roles, "studente")){
            Student s = (Student) user;
            return (s.getClasse().equals(classe) && UserDAO.isRappresentanteByClass(s,classe));
        } else if (MiscUtilities.isRole(roles,"prof")){
            Teacher t = (Teacher) user;
            return (t.getClassi().contains(classe) && t.getSubjects().contains(subject));
        } else {
            //TODO solo return false oppure errore?
            return false;
        }
    }

    public static Teacher getInterrogationTeacher(Interrogation interrogation){
        List<Teacher> classTeacher = interrogation.getClasse().getTeachers();
        for (Teacher t : classTeacher){
            for (Subject s: t.getSubjects()){
                if (s.equals(interrogation.getSubject())){
                    return t;
                }
            }
        }
        return new Teacher();
    }
}
