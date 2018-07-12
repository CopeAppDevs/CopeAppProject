package com.copeapp.dto.survey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
public class AnswerContentDTO {
	
	private Integer answerContentId;
	
	@NonNull
	private String answerText;
	
	private String answerImage;

}
