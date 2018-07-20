package com.copeapp.dto.appunti;

import java.util.Date;

import com.copeapp.dto.commons.StudentDTO;
import com.copeapp.dto.commons.SubjectDTO;
import com.copeapp.dto.commons.TeacherDTO;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of="appuntoId")
@RequiredArgsConstructor
@NoArgsConstructor
public class AppuntoDTO {
	
	
	private Integer appuntoId;
	
	private StudentDTO student;
	
	@NonNull
	private TeacherDTO teacher;
	
	@NonNull
	private SubjectDTO subject;
	
	@NonNull
	private String title;
	
	@NonNull
	private String description;
	
	
	private int likes;
	
	
	private int dislikes;
	
	private Date dataCreazione;
	
	@NonNull
	private Integer classNumber;
	
	@NonNull
	private String section;
	
	@NonNull
	private String indirizzo;
	
	@NonNull
	private String documento;
}
