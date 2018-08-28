package com.copeapp.entities.calendar;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import com.copeapp.entities.common.Classe;
import com.copeapp.entities.common.Student;
import com.copeapp.entities.common.Subject;

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
