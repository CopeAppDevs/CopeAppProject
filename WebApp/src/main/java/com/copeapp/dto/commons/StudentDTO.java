package com.copeapp.dto.commons;

import com.copeapp.entities.common.Classe;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO extends UserDTO {

	@NonNull
	private Classe classe;

}
