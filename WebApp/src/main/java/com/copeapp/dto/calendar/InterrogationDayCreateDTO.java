package com.copeapp.dto.calendar;

import java.util.Date;
import java.util.List;

import com.copeapp.entities.common.Student;

import lombok.Data;
import lombok.NonNull;

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
