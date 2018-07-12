package com.copeapp.dto.calendar;

import com.copeapp.entities.common.Classe;
import com.copeapp.entities.common.Role;
import com.copeapp.entities.common.User;
import lombok.*;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class EventDTO {

    @NonNull
    private User insertUser;

    private User deleteUser;

    @NonNull
    private Date insertDate;

    private Date deleteDate;

    @NonNull
    private List<Role> destinationRoles;

    @NonNull
    private List<Classe> destinationClasses;

    @NonNull
    private String type;

    @NonNull
    private Date eventDate;
}
