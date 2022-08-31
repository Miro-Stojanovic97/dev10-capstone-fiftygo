package fiftygo.data;

import fiftygo.models.Trip;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TripRepository {

    List<Trip> findAll() throws DataAccessException;

    List<Trip> findByUserId(int userId) throws DataAccessException;

    Trip findById(int tripId) throws DataAccessException;

    Trip add(Trip trip) throws DataAccessException;

    boolean addPinToTrip(int pinId, int tripId) throws DataAccessException;

    boolean deletePinFromTrip(int pinId, int tripId) throws DataAccessException;

    boolean update(Trip trip) throws DataAccessException;

    @Transactional
    boolean deleteById(int tripId) throws DataAccessException;
}
