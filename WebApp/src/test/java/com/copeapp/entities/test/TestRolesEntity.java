package com.copeapp.entities.test;

import java.util.ArrayList;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.copeapp.entities.common.Role;

public class TestRolesEntity {

public static void main(String[] args) {
		
		EntityManagerFactory emfactory = Persistence.createEntityManagerFactory("CopeApp");

		EntityManager entitymanager = emfactory.createEntityManager();
		entitymanager.getTransaction().begin();

		ArrayList<Role> roles = new ArrayList<Role>();
		roles.add(new Role("studente", "Studente"));
		roles.add(new Role("prof", "Professore"));
		roles.add(new Role("moderatore", "Moderatore"));
		roles.add(new Role("admin", "Amministratore"));
		roles.add(new Role("redattore", "Redattore"));
		roles.add(new Role("rappresentante", "Rappresentante"));
		
		for(Role r : roles)
			entitymanager.persist(r);
		entitymanager.getTransaction().commit();

		entitymanager.close();
		emfactory.close();
	}
	
}
