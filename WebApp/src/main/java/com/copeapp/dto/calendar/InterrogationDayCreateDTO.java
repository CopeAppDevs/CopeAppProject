package com.copeapp.dto.calendar;

import com.copeapp.entities.common.Student;
import lombok.Data;
import lombok.NonNull;

import java.util.Date;
import java.util.List;

@Data
public class InterrogationDayCreateDTO {

    @NonNull
    private List<Student> studetsInterrogated;

    @NonNull
    private Date eventDate;

    @NonNull
    private Integer minInterrogated;

    @NonNull
    private Integer maxInterrogated;
}
