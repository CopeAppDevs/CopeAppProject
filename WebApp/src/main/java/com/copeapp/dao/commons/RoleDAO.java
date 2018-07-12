package com.copeapp.dao.commons;

import com.copeapp.entities.common.Role;
import com.copeapp.utilities.EntityManagerGlobal;

import java.util.List;

public class RoleDAO {

	public static List<Role> getRolesList() {
	//	TypedQuery<Role> query = EntityManagerGlobal.getEntityManager().createQuery("SELECT r FROM Role r", Role.class);
	//	List<Role> roles = new ArrayList<Role>(query.getResultList());
		//in linea è più meglio
		return EntityManagerGlobal.getEntityManager().createQuery("SELECT r FROM Role r", Role.class).getResultList();
	}

}
