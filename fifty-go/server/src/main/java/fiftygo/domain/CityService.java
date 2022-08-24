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
        return repository.findAll();
    }

    public City findById(int cityId) {
        return repository.findById(cityId);
    }
}
