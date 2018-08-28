package com.copeapp.entities.calendar;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.copeapp.entities.common.Classe;
import com.copeapp.entities.common.Role;
import com.copeapp.entities.common.User;

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
@Table(name="events")
public class Event {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="eventsGenerator")
	@SequenceGenerator(name="eventsGenerator", sequenceName="events_sequence", allocationSize = 1, initialValue = 50)
	private Integer eventId;

	@NonNull
	@ManyToOne(fetch = FetchType.LAZY)
	private User insertUser;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private User deleteUser;
	
	@NonNull
	@Temporal(TemporalType.TIMESTAMP)
	private Date insertDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date deleteDate;

	@ManyToMany
	@JoinTable( name = "eventDestinationRoles_roles",
				joinColumns = { @JoinColumn(name = "eventId") },
				inverseJoinColumns = { @JoinColumn(name = "roleId") } )
	private List<Role> destinationRoles;

	@ManyToMany
	@JoinTable( name = "eventDestinationClasses_classes",
				joinColumns = { @JoinColumn(name = "eventId") },
				inverseJoinColumns = { @JoinColumn(name = "classId") } )
	private List<Classe> destinationClasses;
	
	@NonNull
	private String type;
	
	@NonNull
	@Temporal(TemporalType.TIMESTAMP)
	private Date eventDate;
	
	//TODO eventContent
	
}
