package com.copeapp.entities.common;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
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
@Entity
@Table(name="users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "userType", discriminatorType = DiscriminatorType.STRING)
@EqualsAndHashCode(of = "userId")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="usersGenerator")
	@SequenceGenerator(name="usersGenerator", sequenceName="users_sequence", allocationSize = 1, initialValue = 50)
	private Integer userId;

	@NonNull
	@Column(unique = true)
	private String username;
	
	@Column(unique = true)
	private String mail;

	@NonNull
	private String password;
	
	@NonNull
	private String firstname;
	
	@NonNull
	private String lastname;
	
	@NonNull
	@ManyToMany
	@JoinTable( name = "users_roles",
				joinColumns = { @JoinColumn(name = "userId") },
				inverseJoinColumns = { @JoinColumn(name = "roleId") } )
	private List<Role> roles;
	
	private String imageUrl;
	
	private String wallpaper;
	
	//Set firstEntry parameter as true to show FirstEntry page
	@NonNull
	private Boolean firstEntry;
	
}