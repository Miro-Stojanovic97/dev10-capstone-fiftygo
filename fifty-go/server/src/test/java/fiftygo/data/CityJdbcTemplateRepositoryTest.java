package fiftygo.data;

import fiftygo.models.City;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CityJdbcTemplateRepositoryTest {

    @Autowired
    CityJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAllCities() {
        List<City> cities = null;
        try {
            cities = repository.findAll();
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertNotNull(cities);
        assertEquals(10000, cities.size());
    }

    @Test
    void shouldFindCitiesBySequence() {

        List<City> cities = null;
        try {
            cities = repository.searchCities("st.");
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertEquals(79, cities.size());

        try {
            cities = repository.searchCities("den");
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertEquals(158, cities.size());

        try {
            cities = repository.searchCities("mil");
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertEquals(96, cities.size());

        try {
            cities = repository.searchCities("frank");
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertEquals(29, cities.size());
    }
}