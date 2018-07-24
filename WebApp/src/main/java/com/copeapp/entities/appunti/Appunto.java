package com.copeapp.entities.appunti;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.copeapp.entities.common.Student;
import com.copeapp.entities.common.Subject;
import com.copeapp.entities.common.Teacher;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@RequiredArgsConstructor
@Data
@Entity
@Table(name="appunti")
public class Appunto {


	@Id
	@Setter
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="appuntiGenerator")
	@SequenceGenerator(name="appuntiGenerator", sequenceName="appunti_sequence", allocationSize = 1, initialValue = 50)
	private Integer appuntoId;

	@NonNull
	@ManyToOne(fetch = FetchType.LAZY)
	private Student student;
	
	@NonNull
	@ManyToOne(fetch = FetchType.LAZY)
	private Teacher teacher;

	@NonNull
	@ManyToOne(fetch = FetchType.LAZY)
	private Subject subject;
	
	@NonNull
	private String title;
	
	@NonNull
	private String description;
	
	private int likes;
	
	private int dislikes;
	
	@NonNull
	private Date dataCreazione;
	
	@NonNull
	private Integer classNumber;
	
	@NonNull
	private String section;
	
	@NonNull
	private String indirizzo;
	
	@NonNull
	@Column(name="documento", columnDefinition="TEXT")
	private String documento;
}
