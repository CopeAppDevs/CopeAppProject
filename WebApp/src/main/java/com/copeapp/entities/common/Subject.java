package com.copeapp.entities.common;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "subjectId")
@Entity
@Table(name="subjects")
public class Subject {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="subjectsGenerator")
	@SequenceGenerator(name="subjectsGenerator", sequenceName="subjectsSequence", allocationSize = 1, initialValue = 50)
	private Integer subjectId;
	
	@NonNull
	private String name;
	
	@NonNull
	private String color;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable( name = "subjects_teachers",
				joinColumns = { @JoinColumn(name = "subjectId") },
				inverseJoinColumns = { @JoinColumn(name = "userId") } )
	private List<Teacher> teachers;

}
