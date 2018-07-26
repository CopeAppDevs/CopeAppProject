package com.copeapp.dto.appunti;

import lombok.Data;
import lombok.NonNull;

@Data
public class AppuntoResponseByIdDTO {

	@NonNull
	private AppuntoDTO appunto;
	
}
