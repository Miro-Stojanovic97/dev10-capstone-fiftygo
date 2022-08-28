package fiftygo.data;

import fiftygo.models.City;
import fiftygo.models.Pin;
import fiftygo.models.Trip;
import fiftygo.models.Type;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
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
        List<Trip> trips = null;
        try {
            trips = repository.findAll();
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertNotNull(trips);

        assertTrue(trips.size() >= 6 && trips.size() >= 8);
    }

    @Test
    void shouldFindTwoTripsByUserId() {
        List<Trip> trips = null;
        try {
            trips = repository.findByUserId(1);
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertEquals(4, trips.size());
    }

    @Test
    void shouldNotFindByUsername() {
        List<Trip> trips = null;
        try {
            trips = repository.findByUserId(4);
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertEquals(0, trips.size());
    }

    @Test
    void shouldFindById() {
        Trip idTwo = null;
        try {
            idTwo = repository.findById(2);
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
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
        Trip result = null;
        try {
            result = repository.findById(10);
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertNull(result);
    }

    @Test
    void shouldAdd() {
        Trip newTrip = makeTrip();
        Trip actual = null;
        try {
            actual = repository.add(newTrip);
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getTripId());

        newTrip = makeTrip();
        newTrip.setTripStartDate(null);
        newTrip.setTripEndDate(null);
        try {
            actual = repository.add(newTrip);
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertNotNull(actual);
        assertEquals(NEXT_ID + 1, actual.getTripId());
    }

    @Test
    void shouldUpdate() {
        Trip updatedTrip = makeTrip();
        updatedTrip.setTripDescription("updated description");
        updatedTrip.setTripStartDate(LocalDate.of(2023,10,15));
        updatedTrip.setTripEndDate(LocalDate.of(2023,10,20));
        try {
            assertTrue(repository.update(updatedTrip));
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void deleteById() {
        try {
            assertTrue(repository.deleteById(3));
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void shouldNotDelete() {
        try {
            assertFalse(repository.deleteById(20));
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
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
        newTrip.setPins(makePin());
        return newTrip;
    }

    private List<Pin> makePin() {
        City city = new City(1840014730, "Columbia", "SC", "South Carolina",new BigDecimal("34.0378"),	new BigDecimal("-80.9036"));
        Type type = new Type(11, "sing");
        List<Pin> pins = new ArrayList<>();
        Pin pin = new Pin();
        pin.setPinId(1);
        pin.setPinDescription("Suspendisse potenti.");
        pin.setPinDate(LocalDate.of(2023, 8,3));
        pin.setPinPriority(5);
        pin.setPinDidIt(false);
        pin.setCity(city);
        pin.setType(type);
        pin.setAppUserId(3);
        pins.add(pin);
        return pins;
    }
}