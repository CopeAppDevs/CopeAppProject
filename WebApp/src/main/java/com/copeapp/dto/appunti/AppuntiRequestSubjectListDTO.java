package com.copeapp.dto.appunti;

import lombok.Data;

@Data
public class AppuntiRequestSubjectListDTO {
	
	private boolean mine; // restituisce i miei appunti

	private String text;
	

}
