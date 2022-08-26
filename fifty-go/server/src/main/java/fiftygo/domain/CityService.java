package fiftygo.domain;

import fiftygo.data.CityRepository;
import fiftygo.models.City;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {

    private final CityRepository repository;

    public CityService(CityRepository repository) {
        this.repository = repository;
    }

    public List<City> findAll() {
        try {
            return repository.findAll();
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
    }

    public City findById(int cityId) {
        try {
            return repository.findById(cityId);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
    }

    public List<City> findByStateAbr(String stateAbr) {
        try {
            return repository.findByStateAbr(stateAbr);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
    }

    public List<City> searchCities(String sequence) {
        try {
            return repository.searchCities(sequence);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
    }
}
