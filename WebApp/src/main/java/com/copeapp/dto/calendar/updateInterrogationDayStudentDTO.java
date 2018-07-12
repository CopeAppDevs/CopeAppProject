package com.copeapp.dto.calendar;

import com.copeapp.entities.calendar.InterrogationDay;
import com.copeapp.entities.common.Student;
import lombok.Data;
import lombok.NonNull;

@Data
public class updateInterrogationDayStudentDTO {

    @NonNull
    private Boolean add;

    @NonNull
    private Student student;

    @NonNull
    private InterrogationDay interrogationDay;
}
