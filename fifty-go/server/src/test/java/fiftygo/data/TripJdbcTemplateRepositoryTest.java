package fiftygo.data;

import fiftygo.models.Trip;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TripJdbcTemplateRepositoryTest {

    @Autowired
    TripJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup(){
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Trip> trips = repository.findAll();
        assertNotNull(trips);

        assertTrue(trips.size() == 6);
    }

    @Test
    void shouldFindTwoTripsByUsername() {
        List<Trip> jsmith1 = repository.findByUsername("jsmith1");
        //assertEquals(2, jsmith1.);
    }

    @Test
    void shouldNotFindByUsername() {
    }

    @Test
    void shouldFindById() {
    }

    @Test
    void shouldNotFindById() {
    }

    @Test
    void shouldAdd() {
    }

    @Test
    void shouldNotAdd() {
    }

    @Test
    void shouldUpdate() {
    }

    @Test
    void shouldNotUpdate() {
    }

    @Test
    void deleteById() {
    }

    @Test
    void shouldNotDelete() {
    }
}