package fiftygo.data;

import fiftygo.models.Pin;
import fiftygo.models.Trip;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class TripJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 7;

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
    void shouldFindTwoTripsByUserId() {
        List<Trip> trips = repository.findByUserId(1);
        assertEquals(2, trips.size());
    }

    @Test
    void shouldNotFindByUsername() {
        List<Trip> trips = repository.findByUserId(4);
        assertEquals(0, trips.size());
    }

    @Test
    void shouldFindById() {
        Trip idTwo = repository.findById(2);
        assertEquals("In congue.", idTwo.getTripDescription());
        assertEquals(LocalDate.of(2022,07,16), idTwo.getTripStartDate());
        assertEquals(LocalDate.of(2022,07,20), idTwo.getTripEndDate());
        assertEquals("rental car", idTwo.getTransportation());
        assertEquals(1, idTwo.getTripPriority());
        assertEquals(true, idTwo.isTripDidIt());
        assertEquals(3, idTwo.getUserId());
    }

    @Test
    void shouldNotFindById() {
        Trip result = repository.findById(10);
        assertNull(result);
    }

    @Test
    void shouldAdd() {
        Trip newTrip = makeTrip();
        Trip actual = repository.add(newTrip);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getTripId());

        newTrip = makeTrip();
        newTrip.setTripStartDate(null);
        newTrip.setTripEndDate(null);
        actual = repository.add(newTrip);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getTripId());
    }

    @Test
    void shouldUpdate() {
        Trip updatedTrip = makeTrip();
        updatedTrip.setTripDescription("updated description");
        updatedTrip.setTripStartDate(LocalDate.of(2023,10,15));
        updatedTrip.setTripEndDate(LocalDate.of(2023,10,20));
        assertTrue(repository.update(updatedTrip));
    }

    @Test
    void deleteById() {
        assertTrue(repository.deleteById(3));
    }

    @Test
    void shouldNotDelete() {
        assertFalse(repository.deleteById(7));
    }

    private Trip makeTrip() {
        Trip newTrip = new Trip();
        newTrip.setTripDescription("test description");
        newTrip.setTripStartDate(LocalDate.of(2023,9,15));
        newTrip.setTripEndDate(LocalDate.of(2023,9,20));
        newTrip.setTransportation("bus");
        newTrip.setTripPriority(1);
        newTrip.setTripDidIt(false);
        newTrip.setUserId(1);
        return newTrip;
    }
}