package com.copeapp.dto.commons;

import java.util.ArrayList;
import java.util.List;

import com.copeapp.entities.common.Role;

import lombok.Data;
import lombok.NonNull;

@Data
public class RoleListDTO {
	
	@NonNull
	private List<RoleDTO> roles = null;
	
	public RoleListDTO(List<Role> rr) {
		this.roles = new ArrayList<RoleDTO>();
		for (Role r : rr) {
			RoleDTO tmp = new RoleDTO();
			tmp.setRole(r.getRole());
			tmp.setDescription(r.getDescription());
			tmp.setRoleId(r.getRoleId());
			this.roles.add(tmp);
		}
	}

}
