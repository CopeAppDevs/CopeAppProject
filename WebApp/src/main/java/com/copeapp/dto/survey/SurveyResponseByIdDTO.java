package com.copeapp.dto.survey;

import lombok.Data;
import lombok.NonNull;

@Data
public class SurveyResponseByIdDTO {

	@NonNull
	private SurveyDTO surveyDTO;
	
	@NonNull
	private boolean hasVoted;
}
