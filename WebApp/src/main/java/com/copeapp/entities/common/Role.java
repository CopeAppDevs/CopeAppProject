package com.copeapp.entities.common;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="roles")
@EqualsAndHashCode(of="roleId")
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="rolesGenerator")
	@SequenceGenerator(name="rolesGenerator", sequenceName="roles_sequence", allocationSize = 1, initialValue = 50)
	private int roleId;
	
	@NonNull
	private String role;
	
	@NonNull
	private String description;
}
