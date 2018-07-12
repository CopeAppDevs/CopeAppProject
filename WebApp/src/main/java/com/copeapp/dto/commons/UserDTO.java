package com.copeapp.dto.commons;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
public class UserDTO {
	
	@NonNull
	private Integer userId;
	
	@NonNull
	private String username;
	
	@NonNull
	private String mail;
	
	@NonNull
	private String password;
	
	@NonNull
	private String firstname;
	
	@NonNull
	private String lastname;
	
	@NonNull
	private List<RoleDTO> roles;
	
	@NonNull
	private String imageUrl;
	
	@NonNull
	private String wallpaper;
	
	@NonNull
	private Boolean firstEntry; //Mettere true per mostrare la pagina di first entry
	
}