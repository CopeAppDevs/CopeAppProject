package com.copeapp.dto.calendar;

import com.copeapp.entities.calendar.Interrogation;
import com.copeapp.entities.common.Student;
import com.copeapp.entities.common.Subject;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
public class InterrogationDayDTO extends EventDTO{

    @NonNull
    private List<Student> studentsInterrogated;

    @NonNull
    private Subject subject;

    @NonNull
    private Interrogation interrogation;

    @NonNull
    private Integer minInterrogated;

    @NonNull
    private Integer maxInterrogated;
}
