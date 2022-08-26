package fiftygo.domain;

import fiftygo.data.PinRepository;
import fiftygo.models.Pin;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.List;
import java.util.Set;

@Service
public class PinService {

    private final PinRepository repository;

    public PinService(PinRepository repository) {
        this.repository = repository;
    }

    public List<Pin> findAll() {
        try {
            return repository.findAll();
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Pin> findByUserId(int userId) {
        try {
            return repository.findByUserId(userId);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
    }

    public Pin findById(int pinId) {
        try {
            return repository.findById(pinId);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
    }

    public Result<Pin> add(Pin pin) {
        Result<Pin> result = new Result<>();

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Pin>> violations = validator.validate(pin);

        if (!violations.isEmpty()) {
            for (ConstraintViolation<Pin> violation : violations) {
                result.addErrorMessage(violation.getMessage(), ResultType.INVALID);
            }
            return result;
        }

        try {
            result.setPayload(repository.add(pin));
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    public Result<Pin> update(Pin pin) {
        Result<Pin> result = new Result<>();

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Pin>> violations = validator.validate(pin);

        if (!violations.isEmpty()) {
            for (ConstraintViolation<Pin> violation : violations) {
                result.addErrorMessage(violation.getMessage(), ResultType.INVALID);
            }
            return result;
        }
        boolean success = false;
        try {
            success = repository.update(pin);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
        if (!success) {
            result.addErrorMessage("Something went wrong.", ResultType.NOT_FOUND);
            return result;
        }
        result.setPayload(pin);
        return result;
    }

    public boolean deleteById(int pinId) {
        try {
            return repository.deleteById(pinId);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
    }
}
