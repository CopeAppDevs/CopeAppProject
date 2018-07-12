package com.copeapp.dto.commons;

import java.util.List;

import com.copeapp.entities.common.Student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClasseDTO {

	@NonNull
	private Integer classId;
	
	@NonNull
	private Integer number;
	
	@NonNull
	private String section;
	
	@NonNull
	private String indirizzo;
	
	@NonNull
	private List<StudentDTO> students;
	
	@NonNull
	private List<StudentDTO> rappresentanti;
	
	@NonNull
	private List<TeacherDTO> teachers;
	
	@NonNull
	private TeacherDTO coordinator;

}
