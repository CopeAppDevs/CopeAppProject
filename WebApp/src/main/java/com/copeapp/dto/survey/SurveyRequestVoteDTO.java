package com.copeapp.dto.survey;

import java.util.ArrayList;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
public class SurveyRequestVoteDTO {
	
	@NonNull
	private Integer surveyId;
	
	@NonNull
	private ArrayList<Integer> answersId;
}
