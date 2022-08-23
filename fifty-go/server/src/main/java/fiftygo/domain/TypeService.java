package fiftygo.domain;

import fiftygo.data.TypeRepository;
import fiftygo.models.Type;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.List;
import java.util.Set;

@Service
public class TypeService {

    private final TypeRepository repository;

    public TypeService(TypeRepository repository) {
        this.repository = repository;
    }

    public List<Type> findAll() {
        return repository.findAll();
    }

    public Type findById (int typeId) {
        return repository.findById(typeId);
    }

    public Result<Type> add (Type type) {
        Result<Type> result = new Result<>();

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator(); // Returns a Hibernate validator hidden behind an interface.
        Set<ConstraintViolation<Type>> violations = validator.validate(type);

        if (!violations.isEmpty()) {
            for (ConstraintViolation<Type> violation : violations) {
                result.addErrorMessage(violation.getMessage(), ResultType.INVALID);
            }
            return result;
        }

        result.setPayload(repository.add(type));
        return result;
    }

    public Result<Type> update (Type type) {
        Result<Type> result = new Result<>();

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator(); // Returns a Hibernate validator hidden behind an interface.
        Set<ConstraintViolation<Type>> violations = validator.validate(type);

        if (!violations.isEmpty()) {
            for (ConstraintViolation<Type> violation : violations) {
                result.addErrorMessage(violation.getMessage(), ResultType.INVALID);
            }
            return result;
        }

        boolean success = repository.update(type);
        if(!success) {
            result.addErrorMessage("Something went wrong.", ResultType.NOT_FOUND);
            return result;
        }

        result.setPayload(type);
        return result;
    }

    public boolean deleteById (int typeId) {
        return repository.deleteById(typeId);
    }

}
