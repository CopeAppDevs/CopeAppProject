package com.copeapp.dto.commons;

import java.util.List;

import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubjectDTO {
	
	private Integer subjectId;
	
	private String name;
	
	private String color;
	
	@Transient
	private List<TeacherDTO> teachers;

}
