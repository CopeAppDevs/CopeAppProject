package com.copeapp.dto.login;

import com.copeapp.dto.commons.UserDTO;

import lombok.Data;
import lombok.NonNull;

@Data
public class LoginResponseDTO {

	@NonNull
	private UserDTO user;
	
}
