package com.copeapp.entities.common;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@DiscriminatorValue("student")
public class Student extends User {
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Classe classe;

	public Student(String username, String password, String firstname, String lastname, List<Role> roles,
			Boolean firstEntry, Classe classe) {
		super(username, password, firstname, lastname, roles, firstEntry);
		this.classe = classe;
	}
	
	public Student(String username, String password, String firstname, String lastname, List<Role> roles,
			Boolean firstEntry) {
		super(username, password, firstname, lastname, roles, firstEntry);
	}
	
	//TODO collegare voti dello studente

}
