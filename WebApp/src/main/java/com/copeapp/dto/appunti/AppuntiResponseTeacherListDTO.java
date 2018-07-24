package com.copeapp.dto.appunti;

import java.util.ArrayList;
import java.util.List;

import com.copeapp.dto.commons.TeacherDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AppuntiResponseTeacherListDTO {

	private List<TeacherDTO> teacherList = new ArrayList<TeacherDTO>();

}
