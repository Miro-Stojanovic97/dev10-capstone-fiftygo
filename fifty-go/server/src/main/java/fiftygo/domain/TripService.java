package fiftygo.domain;

import fiftygo.data.TripRepository;
import fiftygo.models.Trip;
import fiftygo.models.Type;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.List;
import java.util.Set;

@Service
public class TripService {

    private final TripRepository repository;

    public TripService(TripRepository repository) {
        this.repository = repository;
    }

    public List<Trip> findAll() {
        return repository.findAll();
    }

    public List<Trip> findByUserId(int userId) {
        return repository.findByUserId(userId);
    }

    public Trip findById(int tripId) {
        return repository.findById(tripId);
    }

    public Result<Trip> add(Trip trip) {
        Result<Trip> result = new Result<>();

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator(); // Returns a Hibernate validator hidden behind an interface.
        Set<ConstraintViolation<Trip>> violations = validator.validate(trip);

        if (!violations.isEmpty()) {
            for (ConstraintViolation<Trip> violation : violations) {
                result.addErrorMessage(violation.getMessage(), ResultType.INVALID);
            }
            return result;
        }

        result.setPayload(repository.add(trip));
        return result;
    }

    public Result<Trip> update(Trip trip) {
        Result<Trip> result = new Result<>();

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator(); // Returns a Hibernate validator hidden behind an interface.
        Set<ConstraintViolation<Trip>> violations = validator.validate(trip);

        if (!violations.isEmpty()) {
            for (ConstraintViolation<Trip> violation : violations) {
                result.addErrorMessage(violation.getMessage(), ResultType.INVALID);
            }
            return result;
        }

        boolean success = repository.update(trip);
        if(!success) {
            result.addErrorMessage("Something went wrong.", ResultType.NOT_FOUND);
            return result;
        }

        result.setPayload(trip);
        return result;
    }

    public Result<Trip> deleteById(int tripId) {
        Result<Trip> result = new Result<>();
        if(!repository.deleteById(tripId)){
            result.addErrorMessage("Trip Id %s was not found.", ResultType.NOT_FOUND, tripId);
        }
        return result;
    }
}
