package com.copeapp.dto.survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor
public class AnswerDTO {
	
	private Integer answerId; 
	
	private String answerType;
	
	@NonNull
	private AnswerContentDTO answerContent;
	
	@NonNull
	private Integer votesNumber;
}
