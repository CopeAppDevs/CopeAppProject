package com.copeapp.dto.login;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginRequestDTO {
	
	@NonNull String mail;
	@NonNull String password;
}
