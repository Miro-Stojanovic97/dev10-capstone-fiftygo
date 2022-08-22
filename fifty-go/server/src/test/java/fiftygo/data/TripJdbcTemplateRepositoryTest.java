package fiftygo.data;

import fiftygo.models.Trip;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
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
        List<Trip> trips = repository.findByUsername("jsmith1");
        assertEquals(2, trips.size());
    }

    @Test
    void shouldNotFindByUsername() {
        List<Trip> trips = repository.findByUsername("jsmith4");
        assertEquals(0, trips.size());
    }

    @Test
    void shouldFindById() {
        Trip idTwo = repository.findById(2);
        assertEquals("In congue.", idTwo.getTripDescription());
        assertEquals("2022-07-16", idTwo.getTripStartDate());
        assertEquals("2022-07-20", idTwo.getTripEndDate());
        assertEquals("rental car", idTwo.getTransportation());
        assertEquals(1, idTwo.getTripPriority());
        assertEquals(1, idTwo.isTripDidIt());
        assertEquals(3, idTwo.getUserId());
    }

    @Test
    void shouldNotFindById() {
        Trip idTen = repository.findById(10);
        assertEquals(null, idTen.getTripDescription());
    }

    @Test
    void shouldAdd() {
        Trip newTrip = new Trip();
        newTrip.setTripDescription("test description");
//        newTrip.setTripStartDate(2023-09-15);
//        newTrip.setTripEndDate(2023-09-20);
//    repository.add("test description", "2023-09-15", "2023-09-20", "bus", 1, 0, 1);
    }

    @Test
    void shouldNotAdd() {
        Trip invalidTrip = new Trip();
        invalidTrip.setTripDescription(null);
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