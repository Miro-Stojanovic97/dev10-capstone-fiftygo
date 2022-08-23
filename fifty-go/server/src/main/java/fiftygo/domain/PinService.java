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
        return repository.findAll();
    }

    public List<Pin> findByUserId(int userId) {
        return repository.findByUserId(userId);
    }

    public Pin findById(int pinId) {
        return repository.findById(pinId);
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

        result.setPayload(repository.add(pin));
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
        boolean success = repository.update(pin);
        if (!success) {
            result.addErrorMessage("Something went wrong.", ResultType.NOT_FOUND);
            return result;
        }
        result.setPayload(pin);
        return result;
    }

    public boolean deleteById(int pinId) {
        return repository.deleteById(pinId);
    }
}
