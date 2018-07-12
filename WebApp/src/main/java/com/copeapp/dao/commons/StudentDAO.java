package com.copeapp.dao.commons;

import com.copeapp.entities.common.Classe;
import com.copeapp.entities.common.Student;
import com.copeapp.entities.common.Teacher;

import java.util.List;

public class StudentDAO {

    public static List<Teacher> selectTeachers(Student student){
        return student.getClasse().getTeachers();
    }

    public static boolean isStudentsFromSameClass(List<Student> students){
        Classe classe = students.get(0).getClasse();
        for (Student c : students){
            if (!c.getClasse().equals(classe)){
                return false;
            }
        }
        return true;
    }
}
