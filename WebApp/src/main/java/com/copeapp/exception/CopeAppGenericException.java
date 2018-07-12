package com.copeapp.exception;

import lombok.Getter;
import lombok.Setter;

public class CopeAppGenericException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private int httpStatus;

	public CopeAppGenericException(int httpStatus) {
		super();
		this.httpStatus = httpStatus;
	}

	public CopeAppGenericException(int httpStatus, String message) {
		super(message);
		this.httpStatus = httpStatus;
	}

	public CopeAppGenericException(int httpStatus, Throwable cause) {
		super(cause);
		this.httpStatus = httpStatus;
	}

	public CopeAppGenericException(int httpStatus, String message, Throwable cause) {
		super(message, cause);
		this.httpStatus = httpStatus;
	}

	public CopeAppGenericException(int httpStatus, String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		this.httpStatus = httpStatus;
	}
}
