package com.copeapp.utilities;

import javax.persistence.EntityManager;

public class EntityManagerGlobal {
	private static ThreadLocal<EntityManager> entityManager  = new ThreadLocal<EntityManager>();
	
	public static void initializeEntityManager() {
		entityManager.set(EntityManagerFactoryGlobal.getInstance().getEmfactory().createEntityManager());
		entityManager.get().getTransaction().begin();
	}
	
	public static void killEntityManager(boolean rollback) {
		if (entityManager.get().getTransaction().isActive()) {
			if(rollback) {
				entityManager.get().getTransaction().rollback();
			} else {
				entityManager.get().getTransaction().commit();
			}
		}
		entityManager.get().close();
		entityManager.remove();
	}
	
	public static EntityManager getEntityManager() {
		return entityManager.get();
	}
}
