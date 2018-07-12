package com.copeapp.exception;

public class CalendarException extends CopeAppGenericException {

    public CalendarException(int httpStatus) {
        super(httpStatus);
    }

    public CalendarException(int httpStatus, String message) {
        super(httpStatus, message);
    }

    public CalendarException(int httpStatus, Throwable cause) {
        super(httpStatus, cause);
    }

    public CalendarException(int httpStatus, String message, Throwable cause) {
        super(httpStatus, message, cause);
    }

    public CalendarException(int httpStatus, String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(httpStatus, message, cause, enableSuppression, writableStackTrace);
    }
}
