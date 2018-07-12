package com.copeapp.dao.commons;

import com.copeapp.entities.common.Classe;
import com.copeapp.utilities.EntityManagerGlobal;

import javax.persistence.TypedQuery;
import java.util.List;

public class ClasseDAO {

    public static List<Classe> selectClassByIndirizzo(String indirizzo){
        TypedQuery<Classe> query = EntityManagerGlobal.getEntityManager()
                .createQuery("FROM Classe WHERE (indirizzo = :indirizzo)", Classe.class);
        query.setParameter("indirizzo", indirizzo);
        return query.getResultList();
    }

    public static List<Classe> selectClassByIndirizzoNumber(String indirizzo, Integer number){
        TypedQuery<Classe> query = EntityManagerGlobal.getEntityManager()
                .createQuery("FROM Classe WHERE (indirizzo = :indirizzo AND number = :number)", Classe.class);
        query.setParameter("number", number);
        query.setParameter("indirizzo", indirizzo);
        return query.getResultList();
    }

    public static List<Classe> selectClassByNumber(Integer number){
        TypedQuery<Classe> query = EntityManagerGlobal.getEntityManager()
                .createQuery("FROM Classe WHERE number = :number", Classe.class);
        query.setParameter("number", number);
        return query.getResultList();
    }

    public static long countStudents(Classe classe){
        TypedQuery<Long> query = EntityManagerGlobal.getEntityManager().createQuery(
                "SELECT COUNT(DISTINCT s) FROM Student s INNER JOIN s.classe c WHERE (c.classId = := classId", Long.class);
        query.setParameter("classId", classe.getClassId());
        return query.getSingleResult();
    }

    public static Classe selectClasseById(Integer id){
        return EntityManagerGlobal.getEntityManager().find(Classe.class, id);
    }
}
