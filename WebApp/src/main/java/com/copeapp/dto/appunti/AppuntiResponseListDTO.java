package com.copeapp.dto.appunti;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@AllArgsConstructor
@Data
public class AppuntiResponseListDTO {
	
	@NonNull
	private ArrayList<AppuntoMiniDTO> appuntoMini= new ArrayList<AppuntoMiniDTO>();
}
