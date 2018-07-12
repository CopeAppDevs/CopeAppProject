package com.copeapp.dto.survey;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor  //Dozer vuole un costruttore vuoto
public class SurveyMiniDTO {

	private int surveyId;
	
	@NonNull
	private String question;
	
	@NonNull
	private Date closeSurveyDate;
	
	@NonNull
	private Date openSurveyDate;
	
	private Integer voters;
}
