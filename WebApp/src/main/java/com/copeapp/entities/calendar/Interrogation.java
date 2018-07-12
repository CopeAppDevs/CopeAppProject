package com.copeapp.entities.calendar;

import com.copeapp.entities.common.Classe;
import com.copeapp.entities.common.Student;
import com.copeapp.entities.common.Subject;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@Entity
@Table(name="interrogations")
public class Interrogation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="eventsGenerator")
    @SequenceGenerator(name="eventsGenerator", sequenceName="events_sequence", allocationSize = 1, initialValue = 50)
    private Integer interrogationId;

    @NonNull
    @ManyToMany
    private Classe classe;

    @NonNull
    @ManyToMany
    private Subject subject;

    @NonNull
    @ManyToMany //TODO aggiungere allo user le sue interrogazioni?
    private List<Student> studentsInterrogated;

    @NonNull
    @OneToMany(mappedBy="interrogation", cascade = CascadeType.ALL, orphanRemoval=true)
    private List<InterrogationDay> daysOfInterrogation;

    @NonNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date startInterrogation;

    @NonNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date endInterrogation;

    @NonNull
    private Integer daysBeforeClosing;

}
