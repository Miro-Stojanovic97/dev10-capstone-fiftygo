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
        try {
            return repository.findAll();
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
    }

    public Type findById (int typeId) {
        try {
            return repository.findById(typeId);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Type> searchTypes(String sequence) {
        try {
            return repository.searchTypes(sequence);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
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

        try {
            result.setPayload(repository.add(type));
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
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

        boolean success = false;
        try {
            success = repository.update(type);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
        if(!success) {
            result.addErrorMessage("Something went wrong.", ResultType.NOT_FOUND);
            return result;
        }

        result.setPayload(type);
        return result;
    }

    public Result<Type> deleteById (int typeId) {
        Result<Type> result = new Result<>();
        try {
            if(!repository.deleteById(typeId)){
                result.addErrorMessage("Type Id %s was not found.", ResultType.NOT_FOUND, typeId);
            }
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

}
