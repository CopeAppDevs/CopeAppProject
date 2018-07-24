package com.copeapp.dto.appunti;

import lombok.Data;

@Data
public class AppuntiRequestTeacherListDTO {
	
	private boolean mine; // restituisce i miei prof

	private String text;

}
