package com.copeapp.dao.commons;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.TypedQuery;

import com.copeapp.entities.common.Classe;
import com.copeapp.entities.common.Student;
import com.copeapp.entities.common.Teacher;
import com.copeapp.entities.common.User;
import com.copeapp.utilities.EntityManagerGlobal;
import com.copeapp.utilities.MiscUtilities;

public class TeacherDAO {

    public static List<Student> selectAllStudent(Teacher teacher){
        List<Student> allStudent = new ArrayList<>();
        for (Classe c : teacher.getClassi()){
            allStudent.addAll(c.getStudents());
        }
        return allStudent;
    }

    public static boolean isUserTeacherOfClass(User user, Classe classe){
        if (MiscUtilities.isRole(user.getRoles(), "prof")) {
            Teacher teacher = (Teacher) user;
            for (Classe c : teacher.getClassi()) {
                if (c.equals(classe)) {
                    return true;
                }
            }
        }
        return false;
    }
    public static Teacher getTeacherById(int userId) {
		return EntityManagerGlobal.getEntityManager().find(Teacher.class, userId);
	}
    
    public static List<Teacher> getAllTeacher(User currentUser, boolean mine, String text) {
		TypedQuery<Teacher> query = EntityManagerGlobal.getEntityManager()
                .createQuery("FROM Teacher", Teacher.class);
        return query.getResultList();
	}
}
