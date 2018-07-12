package com.copeapp.dao.commons;

import com.copeapp.entities.common.Classe;
import com.copeapp.entities.common.Student;
import com.copeapp.entities.common.Teacher;
import com.copeapp.entities.common.User;
import com.copeapp.utilities.MiscUtilities;

import java.util.ArrayList;
import java.util.List;

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
}
