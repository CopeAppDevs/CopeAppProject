package com.copeapp.dto.calendar;

import java.util.Date;
import java.util.List;

import com.copeapp.dto.commons.ClasseDTO;
import com.copeapp.dto.commons.RoleDTO;
import com.copeapp.entities.common.User;

import lombok.Data;
import lombok.NonNull;

@Data
public class EventDTO {

    @NonNull
    private User insertUser;

    private User deleteUser;

    @NonNull
    private Date insertDate;

    private Date deleteDate;

    @NonNull
    private List<RoleDTO> destinationRoles;

    @NonNull
    private List<ClasseDTO> destinationClasses;

    @NonNull
    private String type;

    @NonNull
    private Date eventDate;
}
