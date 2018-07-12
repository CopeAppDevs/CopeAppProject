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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="interrogationEventsGenerator")
    @SequenceGenerator(name="interrogationEventsGenerator", sequenceName="interrogationEvents_sequence", allocationSize = 1, initialValue = 50)
    private Integer interrogationId;

    @NonNull
//    @ManyToMany
    @Transient
    private Classe classe;

    @NonNull
//    @ManyToMany
    @Transient
    private Subject subject;

    @NonNull
    @ManyToMany //TODO aggiungere allo user le sue interrogazioni? AHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAH
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
