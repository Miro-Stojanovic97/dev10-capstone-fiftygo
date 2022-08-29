package fiftygo.models;

import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class PinTest {

    @Test
    void emptyPinShouldFailValidation() {
        Pin pin = new Pin();

        // Grab a Validator instance and validate the ticket.
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Pin>> violations = validator.validate(pin);

        assertEquals(3, violations.size());
    }

}