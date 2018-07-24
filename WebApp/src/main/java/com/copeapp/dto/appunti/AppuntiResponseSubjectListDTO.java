package com.copeapp.dto.appunti;

import java.util.ArrayList;
import java.util.List;

import com.copeapp.dto.commons.SubjectDTO;
import com.copeapp.entities.common.Subject;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AppuntiResponseSubjectListDTO {

	private List<SubjectDTO> subjectList = new ArrayList<SubjectDTO>();

}
