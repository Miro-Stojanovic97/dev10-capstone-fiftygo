package fiftygo.data;

import fiftygo.models.City;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CityRepository {

    List<City> findAll() throws DataAccessException;

    City findById(int cityId) throws DataAccessException;

    // findByState
    List<City> findByStateAbr(String stateAbr) throws DataAccessException;

    // filterByBeginsWith
    List<City> searchCities(String sequence) throws DataAccessException;

    City add(City city) throws DataAccessException;

    boolean update(City city) throws DataAccessException;

    @Transactional
    boolean deleteById(int cityId) throws DataAccessException;
}
