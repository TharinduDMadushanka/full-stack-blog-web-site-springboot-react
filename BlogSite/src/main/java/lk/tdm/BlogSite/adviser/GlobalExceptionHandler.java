package lk.tdm.BlogSite.adviser;


import jdk.jshell.spi.ExecutionControl;
import lk.tdm.BlogSite.exception.BadRequestException;
import lk.tdm.BlogSite.exception.InternalServerException;
import lk.tdm.BlogSite.exception.NotFoundException;
import lk.tdm.BlogSite.util.StandardResponse;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ChangeSetPersister.NotFoundException.class)
    public ResponseEntity<StandardResponse> handleNotFoundException(NotFoundException e) {
        return new ResponseEntity<>(
                new StandardResponse(404, "NOT FOUND", e.getMessage()),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<StandardResponse> handleBadRequestException(BadRequestException e) {
        return new ResponseEntity<>(
                new StandardResponse(400, "BAD REQUEST", e.getMessage()),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(ExecutionControl.InternalException.class)
    public ResponseEntity<StandardResponse> handleInternalServerException(InternalServerException e) {
        return new ResponseEntity<>(
                new StandardResponse(500, "INTERNAL SERVER ERROR", e.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandardResponse> handleGlobalException(Exception e) {
        return new ResponseEntity<>(
                new StandardResponse(500, "ERROR", "An unexpected error occurred: " + e.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
