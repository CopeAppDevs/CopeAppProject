package com.copeapp.dto.survey;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
public class SurveyRequestDeleteDTO {
	
	@NonNull
	private Integer surveyId;
}
