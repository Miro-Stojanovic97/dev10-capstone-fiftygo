package fiftygo.data;

import fiftygo.models.City;
import fiftygo.models.Pin;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CityRepository {

    List<City> findAll();

    City findById(int cityId);

    // findByState
    List<City> findByStateAbr(String stateAbr);

    City add(City city);

    boolean update(City city);

    @Transactional
    boolean deleteById(int cityId);
}
