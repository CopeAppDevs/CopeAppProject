package com.copeapp.dto.survey;

import java.util.Date;
import java.util.List;

import com.copeapp.dto.commons.RoleDTO;
import com.copeapp.entities.common.User;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of="surveyId")
@RequiredArgsConstructor
@NoArgsConstructor
public class SurveyDTO {

	private Integer surveyId;

	@NonNull
	private String question;

	@NonNull
	private Integer answersNumber;
	
	@NonNull
	private Date openSurveyDate;
	
	@NonNull
	private Date closeSurveyDate;

	@NonNull
	private Date insertDate;
	
	@NonNull
	private User insertUser;

	@NonNull
	private List<RoleDTO> surveyVotersRoles;

	@NonNull
	private List<RoleDTO> surveyViewersRoles;

	@NonNull
	private List<AnswerDTO> answers;
	
	@NonNull
	private Integer voters;
	
}
