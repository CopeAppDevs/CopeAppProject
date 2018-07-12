package com.copeapp.entities.calendar;

import com.copeapp.entities.common.Student;
import com.copeapp.entities.common.Subject;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@Entity
@Table(name="interrogationdays")
public class InterrogationDay extends Event {

    @NonNull
    @ManyToMany
    private List<Student> studentsInterrogated;

    @NonNull
    @ManyToMany
    private Subject subject;

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interrogationId")
    private Interrogation interrogation;

    @NonNull
    private Integer minInterrogated;

    @NonNull
    private Integer maxInterrogated;
}
