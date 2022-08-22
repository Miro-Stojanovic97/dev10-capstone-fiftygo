package fiftygo.data;

import fiftygo.models.City;

import java.util.List;

public class CityJdbcTemplateRepository implements CityRepository{
    @Override
    public List<City> findAll() {
        return null;
    }

    @Override
    public City findById(int cityId) {
        return null;
    }

    @Override
    public City add(City city) {
        return null;
    }

    @Override
    public boolean update(City city) {
        return false;
    }

    @Override
    public boolean deleteById(int cityId) {
        return false;
    }
}
