package com.copeapp.dto.calendar;

import com.copeapp.entities.calendar.Interrogation;
import com.copeapp.entities.common.Student;
import com.copeapp.entities.common.Subject;
import lombok.Data;
import lombok.NonNull;

import java.util.List;

@Data
public class InterrogationDayDTO {

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
