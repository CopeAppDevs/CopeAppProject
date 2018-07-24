package com.copeapp.dto.appunti;

import lombok.Data;

@Data
public class AppuntiRequestListDTO {
		
	private boolean mine; //restituisce i miei appunti
	
	private String text;
		
	private int lastAppuntoNumber;
	
	private int numberToRetrieve;
}
