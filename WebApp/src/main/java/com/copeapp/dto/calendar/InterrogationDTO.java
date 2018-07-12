package com.copeapp.dto.calendar;

import com.copeapp.entities.calendar.InterrogationDay;
import com.copeapp.entities.common.Classe;
import com.copeapp.entities.common.Student;
import com.copeapp.entities.common.Subject;
import lombok.Data;
import lombok.NonNull;

import java.util.Date;
import java.util.List;

@Data
public class InterrogationDTO {

    @NonNull
    private Classe classe;

    @NonNull
    private Subject subject;

    @NonNull
    private List<Student> studentsInterrogated;

    @NonNull
    private List<InterrogationDay> daysOfInterrogation;

    @NonNull
    private Date startInterrogation;

    @NonNull
    private Date endInterrogation;

    @NonNull
    private Integer daysBeforeClosing;
}
