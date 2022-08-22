package fiftygo.domain;

import fiftygo.data.TripRepository;
import fiftygo.models.Trip;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripService {

    private final TripRepository repository;

    public TripService(TripRepository repository) {
        this.repository = repository;
    }

    public List<Trip> findAll() {
        return repository.findAll();
    }

    public List<Trip> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    public Trip findById(int tripId) {
        return repository.findById(tripId);
    }

    public Result<Trip> add(Trip trip) {
     return null;
    }

    public Result<Trip> update(Trip trip) {
        return null;
    }

    public boolean deleteById(int tripId) {
        return false;
    }
}
