package com.copeapp.dto.commons;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeacherDTO extends UserDTO{
	
	private ClasseDTO coordinatorOf;
	
	private List<SubjectDTO> subjects;
	
	private List<ClasseDTO> classi;

}
