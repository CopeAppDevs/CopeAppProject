package com.copeapp.entities.common;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
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
@EqualsAndHashCode(of = "classId")
@Entity
@Table(name="classes")
public class Classe {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="classesGenerator")
	@SequenceGenerator(name="classesGenerator", sequenceName="classes_sequence", allocationSize = 1, initialValue = 50)
	private Integer classId;
	
	@NonNull
	private Integer number;
	
	@NonNull
	private String section;
	
	@NonNull
	private String indirizzo;
	
	@OneToMany(targetEntity = Student.class, mappedBy="classe", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval=true)
	private List<Student> students;
	
	@OneToMany(targetEntity = Student.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval=true)
	private List<Student> rappresentanti;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable( name = "classes_teachers",
				joinColumns = { @JoinColumn(name = "classId") },
				inverseJoinColumns = { @JoinColumn(name = "userId") } )
	private List<Teacher> teachers;
	
	@NonNull
	@JoinColumn(name="coordinator")
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Teacher coordinator;

}
