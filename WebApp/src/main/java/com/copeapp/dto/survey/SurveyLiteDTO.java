package com.copeapp.dto.survey;

import java.util.Date;
import java.util.List;

import com.copeapp.dto.commons.RoleDTO;
import com.copeapp.entities.common.User;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class SurveyLiteDTO {

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
	//rimosse answer per efficienza
	@NonNull
	private Integer voters;
	
}
