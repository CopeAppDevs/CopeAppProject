package com.copeapp.entities.survey;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@Entity
@Table(name="answers")
public class Answer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="answersGenerator")
	@SequenceGenerator(name="answersGenerator", sequenceName="answers_sequence", allocationSize = 1, initialValue = 50)
	private Integer answerId; 
	
	@NonNull
	@JoinColumn(name="surveyId")
	@ManyToOne(fetch = FetchType.LAZY)
	private Survey survey; 
	
	@NonNull
	@JoinColumn(name="answerContentId")
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private AnswerContent answerContent;
	
	@NonNull
	private Integer votesNumber;
	
	private String answerType;
	
	@OneToMany(
			fetch = FetchType.LAZY,
			mappedBy = "answer",
			cascade = CascadeType.ALL
	)
	private List<Vote> votes;
	
	
}
