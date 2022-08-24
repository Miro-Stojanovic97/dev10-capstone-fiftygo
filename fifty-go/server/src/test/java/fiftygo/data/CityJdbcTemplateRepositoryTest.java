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
        List<City> cities = repository.findAll();
        assertNotNull(cities);
        assertEquals(349, cities.size());
    }
}