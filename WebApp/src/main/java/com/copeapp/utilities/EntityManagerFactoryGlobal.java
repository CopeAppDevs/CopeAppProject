package com.copeapp.utilities;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import lombok.AccessLevel;
import lombok.Getter;

public class EntityManagerFactoryGlobal {

	private static EntityManagerFactoryGlobal instance = new EntityManagerFactoryGlobal();
	
	@Getter(AccessLevel.PACKAGE)
	private EntityManagerFactory emfactory;
	
	private EntityManagerFactoryGlobal() {}
	
	public static EntityManagerFactoryGlobal getInstance() {
		return instance;
	}
	public void createEMFactory() {
		emfactory = Persistence.createEntityManagerFactory("CopeApp");
	}
	public void destroyEMFactory() {
		emfactory.close();
		emfactory = null;
	}
	
}
