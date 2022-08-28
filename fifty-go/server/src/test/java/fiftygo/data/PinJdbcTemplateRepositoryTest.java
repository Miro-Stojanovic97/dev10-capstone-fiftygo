package fiftygo.data;

import fiftygo.models.City;
import fiftygo.models.Pin;
import fiftygo.models.Type;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.EmptyResultDataAccessException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PinJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 31;

    @Autowired
    PinJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAllPins() {

        try {
            City city = new City(1840014730, "Columbia", "SC", "South Carolina",new BigDecimal("34.0378"),	new BigDecimal("-80.9036"));
            Type type = new Type(11, "sing");
            Pin expected = new Pin(3, "Suspendisse potenti.", LocalDate.of(2023, 8, 3), 5, false, city, type, 2);
            List<Pin> pins = repository.findAll();

            assertTrue(pins.contains(expected));
            assertEquals(pins.get(2), expected);
        } catch (EmptyResultDataAccessException ex) {

        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void shouldFindAllUsersPinsByExistingUserId() {
        List<Pin> pins = null;
        try {
            pins = repository.findByUserId(2);
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertNotNull(pins);
        assertEquals(11, pins.size());
    }

    @Test
    void shouldNotFindAllByMissingUserId() {
        List<Pin> pins = null;
        try {
            pins = repository.findByUserId(999);
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertEquals(0, pins.size());
    }

    @Test
    void shouldFindPinByExistingId() {
        City city = new City(1840014730, "Columbia", "SC", "South Carolina",new BigDecimal("34.0378"),	new BigDecimal("-80.9036"));
        Type type = new Type(11, "sing");
        Pin expected = new Pin(3, "Suspendisse potenti.", LocalDate.of(2023, 8,3), 5, false, city, type, 2);

        Pin result = null;
        try {
            result = repository.findById(3);
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }

        assertNotNull(result);
        assertEquals(expected, result);
    }

    @Test
    void shouldNotFindPinByMissingId() {
        Pin result = null;
        try {
            result = repository.findById(999);
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertNull(result);
    }

    @Test
    void shouldAddPin() {
        Pin pin = makePin();
        Pin actual = null;
        try {
            actual = repository.add(pin);
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getPinId());

        pin = makePin();
        pin.setPinDate(null);
        try {
            actual = repository.add(pin);
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertNotNull(actual);
        assertEquals(NEXT_ID + 1, actual.getPinId());

        pin = makePin();
        pin.setType(null);
        try {
            actual = repository.add(pin);
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertNotNull(actual);
        assertEquals(NEXT_ID + 2, actual.getPinId());
    }

    @Test
    void shouldUpdatePin() {
        Pin pin = makePin();
        pin.setPinDescription("Updated test description!");
        pin.setPinId(30);
        try {
            assertTrue(repository.update(pin));
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void shouldDeletePin() {
        try {
            assertTrue(repository.deleteById(26));
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        try {
            assertFalse(repository.deleteById(26));
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
    }

    private Pin makePin() {
        City city = new City(1840014730, "Columbia", "SC", "South Carolina",new BigDecimal("34.0378"),	new BigDecimal("-80.9036"));
        Type type = new Type(11, "sing");
        Pin pin = new Pin();
        pin.setPinDescription("Testing Pin.");
        pin.setPinDate(LocalDate.of(2023, 8,3));
        pin.setPinPriority(5);
        pin.setPinDidIt(false);
        pin.setCity(city);
        pin.setType(type);
        pin.setAppUserId(3);
        return pin;
    }
}