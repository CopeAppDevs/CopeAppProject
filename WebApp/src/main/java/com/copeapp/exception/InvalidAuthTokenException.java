package com.copeapp.exception;

public class InvalidAuthTokenException extends CopeAppGenericException {

	private static final long serialVersionUID = 1L;

	public InvalidAuthTokenException(int httpStatus, String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(httpStatus, message, cause, enableSuppression, writableStackTrace);
	}

	public InvalidAuthTokenException(int httpStatus, String message, Throwable cause) {
		super(httpStatus, message, cause);
	}

	public InvalidAuthTokenException(int httpStatus, String message) {
		super(httpStatus, message);
	}

	public InvalidAuthTokenException(int httpStatus, Throwable cause) {
		super(httpStatus, cause);
	}

	public InvalidAuthTokenException(int httpStatus) {
		super(httpStatus);
	}
	
}
