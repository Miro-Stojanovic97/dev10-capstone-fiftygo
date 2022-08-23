package fiftygo.data;

import fiftygo.models.Pin;
import fiftygo.models.Trip;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TripRepository {

    List<Trip> findAll();

    List<Trip> findByUserId(int userId);

    Trip findById(int tripId);

    Trip add(Trip trip);

    boolean update(Trip trip);

    @Transactional
    boolean deleteById(int tripId);
}
