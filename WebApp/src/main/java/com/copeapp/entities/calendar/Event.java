package com.copeapp.entities.calendar;

import com.copeapp.entities.common.Classe;
import com.copeapp.entities.common.Role;
import com.copeapp.entities.common.User;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

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
