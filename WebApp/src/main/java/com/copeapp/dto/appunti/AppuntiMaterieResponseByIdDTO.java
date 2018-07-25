package com.copeapp.dto.appunti;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@AllArgsConstructor
public class AppuntiMaterieResponseByIdDTO {
	@NonNull
	private ArrayList<AppuntoMiniDTO> appuntiMateria = new ArrayList<AppuntoMiniDTO>();

}
