package com.copeapp.entities.test;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.copeapp.dto.survey.SurveyDTO;
import com.copeapp.entities.survey.Survey;

@Mapper
public interface SurveyMapper {

	SurveyMapper istance = Mappers.getMapper( SurveyMapper.class );
	
	SurveyDTO surveyEntityToDto(Survey survey);
	
}
