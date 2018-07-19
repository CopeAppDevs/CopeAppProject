package com.copeapp.dto.appunti;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
public class AppuntoRequestCreateDTO {
	
	@NonNull
	private AppuntoDTO appuntoDTO;

}
