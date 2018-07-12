package com.copeapp.dto.commons;

import org.apache.commons.lang3.exception.ExceptionUtils;

import lombok.Data;

@Data
public class ExceptionDTO {

	private String stackTrace = null;
	private Integer httpStatus = null;
	private String descrptionForUser = null;
	private String debuggingDescription = null;
	
	public ExceptionDTO(Throwable exception, int httpStatus, String descrptionForUser, String debuggingDescription) {
		
		this.stackTrace = ExceptionUtils.getStackTrace(exception);
		this.httpStatus = httpStatus;
		this.descrptionForUser = descrptionForUser;
		this.debuggingDescription = (debuggingDescription == null)? (descrptionForUser):(debuggingDescription);
	}
	
	public ExceptionDTO(Throwable exception, int httpStatus, String descrptionForUser) {
		
		this.stackTrace = ExceptionUtils.getStackTrace(exception);
		this.httpStatus = httpStatus;
		this.descrptionForUser = descrptionForUser;
		this.debuggingDescription = descrptionForUser;
	}
}
