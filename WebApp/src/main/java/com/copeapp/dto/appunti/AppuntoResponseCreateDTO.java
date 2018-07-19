package com.copeapp.dto.appunti;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppuntoResponseCreateDTO {
	
	@NonNull
	private AppuntoDTO appunto;

}
