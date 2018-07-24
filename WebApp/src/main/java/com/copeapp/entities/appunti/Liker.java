package com.copeapp.entities.appunti;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.copeapp.entities.common.Student;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@RequiredArgsConstructor
@Data
@Entity
@Table(name="likers")
public class Liker {

	@Id
	@Setter
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="likersGenerator")
	@SequenceGenerator(name="likersGenerator", sequenceName="likers_sequence", allocationSize = 1, initialValue = 50)
	private Integer likerId;
	
	@NonNull
	@ManyToOne(fetch = FetchType.LAZY)
	private Student student;
	
	@NonNull
	@ManyToOne(fetch = FetchType.LAZY)
	private Appunto appunto;
	
	@NonNull
	@Temporal(TemporalType.TIMESTAMP)
	private Date insertDate;
	
	private boolean liked;
}
