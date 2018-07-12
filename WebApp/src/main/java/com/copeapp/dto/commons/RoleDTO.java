package com.copeapp.dto.commons;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RoleDTO {
	
	@NonNull private Integer roleId;
	@NonNull private String role;
	@NonNull private String description;
	
}
