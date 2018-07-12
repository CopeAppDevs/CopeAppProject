package com.copeapp.exception;

public class SurveyException extends CopeAppGenericException {

	private static final long serialVersionUID = 1L;

	public SurveyException(int httpStatus, String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(httpStatus, message, cause, enableSuppression, writableStackTrace);
	}

	public SurveyException(int httpStatus, String message, Throwable cause) {
		super(httpStatus, message, cause);
	}

	public SurveyException(int httpStatus, String message) {
		super(httpStatus, message);
	}

	public SurveyException(int httpStatus, Throwable cause) {
		super(httpStatus, cause);
	}

	public SurveyException(int httpStatus) {
		super(httpStatus);
	}
	
}
