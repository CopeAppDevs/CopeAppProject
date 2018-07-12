package com.copeapp.dto.survey;

import lombok.Data;

@Data
public class SurveyRequestListDTO {
	
	private boolean active; //true=attivi false=chiusi
	
	private boolean mine; //restituisce i miei survey
	
	private String keyword;
	
	private int idUtente;
	
	private int lastSurveyNumber;
	
	private int numberToRetrieve;
}
