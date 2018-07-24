package com.copeapp.dao.commons;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.TypedQuery;

import com.copeapp.dto.commons.SubjectDTO;
import com.copeapp.entities.common.Classe;
import com.copeapp.entities.common.Subject;
import com.copeapp.entities.common.User;
import com.copeapp.utilities.EntityManagerGlobal;

public class SubjectDAO {

    public static Subject getSubjectById(int subjectId) {
		return EntityManagerGlobal.getEntityManager().find(Subject.class, subjectId);
	}
    
    

	public static List<Subject> getAllSubject(User currentUser, boolean mine, String text) {
		TypedQuery<Subject> query = EntityManagerGlobal.getEntityManager()
                .createQuery("FROM Subject", Subject.class);
        return query.getResultList();
	}
}
