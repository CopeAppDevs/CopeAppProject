package com.copeapp.exception;

public class LoginException extends CopeAppGenericException{
	
	private static final long serialVersionUID = 1L;

	public LoginException(int httpStatus, String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(httpStatus, message, cause, enableSuppression, writableStackTrace);
	}

	public LoginException(int httpStatus, String message, Throwable cause) {
		super(httpStatus, message, cause);
	}

	public LoginException(int httpStatus, String message) {
		super(httpStatus, message);
	}

	public LoginException(int httpStatus, Throwable cause) {
		super(httpStatus, cause);
	}

	public LoginException(int httpStatus) {
		super(httpStatus);
	}
	
	

}
