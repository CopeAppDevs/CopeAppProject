package com.copeapp.dao.appunti;

import java.util.Date;

import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;

import com.copeapp.entities.appunti.Appunto;
import com.copeapp.entities.appunti.Liker;
import com.copeapp.entities.common.Student;
import com.copeapp.entities.common.User;
import com.copeapp.utilities.EntityManagerGlobal;

public class LikerDAO {

	public static Liker getLikerByAppuntoId(User user, Integer appuntoId) {

		TypedQuery<Liker> query;
		query = EntityManagerGlobal.getEntityManager().createQuery(
				"SELECT DISTINCT s FROM Liker s WHERE s.student.userId = :userId and s.appunto.appuntoId = :appuntoId",
				Liker.class);
		query.setParameter("userId", user.getUserId());
		query.setParameter("appuntoId", appuntoId);
		Liker like;
		try {
			like = query.getSingleResult();
			return like;
		} catch (NoResultException ex) {
			return null;
		}
	}

	public static void updateLikers(User user, Integer appuntoId, boolean vote) {
		TypedQuery<Liker> query;
		query = EntityManagerGlobal.getEntityManager().createQuery(
				"SELECT DISTINCT s FROM Liker s WHERE s.student.userId = :userId and s.appunto.appuntoId = :appuntoId",
				Liker.class);
		query.setParameter("userId", user.getUserId());
		query.setParameter("appuntoId", appuntoId);
		Liker like;
		boolean update = false;
		boolean exVote = false;
		try {
			like = query.getSingleResult();
			exVote = like.isLiked();
			like.setLiked(vote);
			update = true;
		} catch (NoResultException ex) {

			like = new Liker();
			like.setStudent((Student) user);
			like.setInsertDate(new Date());
			like.setLiked(vote);
			like.setAppunto(AppuntoDAO.getAppuntoById(appuntoId));
			EntityManagerGlobal.getEntityManager().persist(like);
		}
		Appunto appunto = AppuntoDAO.getAppuntoById(appuntoId);
		if (update) {
			if (exVote == vote) {
				EntityManagerGlobal.getEntityManager().remove(like);
				if (exVote) {
					appunto.setLikes(appunto.getLikes() - 1);
				} else {
					appunto.setDislikes(appunto.getDislikes() - 1);
				}
			} else {
				if (exVote) {
					appunto.setLikes(appunto.getLikes() - 1);
				} else {
					appunto.setDislikes(appunto.getDislikes() - 1);
				}
				if (vote) {
					appunto.setLikes(appunto.getLikes() + 1);

				} else {
					appunto.setDislikes(appunto.getDislikes() + 1);
				}
			}
		} else {
			if (vote) {
				appunto.setLikes(appunto.getLikes() + 1);

			} else {
				appunto.setDislikes(appunto.getDislikes() + 1);
			}
		}

	}

}
