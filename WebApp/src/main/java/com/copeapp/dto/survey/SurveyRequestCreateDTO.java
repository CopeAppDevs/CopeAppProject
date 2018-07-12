package com.copeapp.dto.survey;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
public class SurveyRequestCreateDTO {
	
	@NonNull
	private SurveyDTO surveyDTO;

}
