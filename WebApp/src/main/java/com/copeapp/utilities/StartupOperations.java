package com.copeapp.utilities;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class StartupOperations implements ServletContextListener {
	
	public StartupOperations() {}
	
	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		//execute commands after startup
		System.out.println("Server started up");
		EntityManagerFactoryGlobal.getInstance().createEMFactory();
		if(EntityManagerFactoryGlobal.getInstance().getEmfactory().getProperties().get("hibernate.hbm2ddl.auto").equals("create")) {
			PopulateDatabase.doPopulate();
		}
		if(EntityManagerFactoryGlobal.getInstance().getEmfactory().getProperties().get("hibernate.hbm2ddl.auto").equals("create-drop")) {
			PopulateDatabase.doPopulate();
		}
	}
	
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		//execute commands before shutdown
		EntityManagerFactoryGlobal.getInstance().destroyEMFactory();
		System.out.println("Server shut down");
	}
}
