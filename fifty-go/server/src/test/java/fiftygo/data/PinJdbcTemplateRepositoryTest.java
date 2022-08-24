package fiftygo.data;

import fiftygo.models.City;
import fiftygo.models.Pin;
import fiftygo.models.Type;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

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
        List<Pin> pins = repository.findAll();
        assertNotNull(pins);
        //assertTrue(pins.size() >= 28 && pins.size() <= 35);
        //assertEquals("Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt.", pins.get(1).getPinDescription());
    }

    @Test
    void shouldFindAllUsersPinsByExistingUserId() {
        List<Pin> pins = repository.findByUserId(2);
        assertNotNull(pins);
        assertEquals(11, pins.size());
    }

    @Test
    void shouldNotFindAllByMissingUserId() {
        List<Pin> pins = repository.findByUserId(999);
        assertEquals(0, pins.size());
    }

    @Test
    void shouldFindPinByExistingId() {
        City city = new City(1840014730, "Columbia", "SC", "South Carolina",new BigDecimal("34.0378"),	new BigDecimal("-80.9036"));
        Type type = new Type(11, "sing");
        Pin expected = new Pin(3, "Suspendisse potenti.", LocalDate.of(2023, 8,3), 5, false, city, type, 2);

        Pin result = repository.findById(3);

        assertNotNull(result);
        assertEquals(expected, result);
    }

    @Test
    void shouldNotFindPinByMissingId() {
        Pin result = repository.findById(999);
        assertNull(result);
    }

    @Test
    void shouldAddPin() {
        Pin pin = makePin();
        Pin actual = repository.add(pin);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getPinId());

        pin = makePin();
        pin.setPinDate(null);
        actual = repository.add(pin);
        assertNotNull(actual);
        assertEquals(NEXT_ID + 1, actual.getPinId());

        pin = makePin();
        pin.setType(null);
        actual = repository.add(pin);
        assertNotNull(actual);
        assertEquals(NEXT_ID + 2, actual.getPinId());
    }

    @Test
    void shouldUpdatePin() {
        Pin pin = makePin();
        pin.setPinDescription("Updated test description!");
        pin.setPinId(30);
        assertTrue(repository.update(pin));
    }

    @Test
    void shouldDeletePin() {
        assertTrue(repository.deleteById(26));
        assertFalse(repository.deleteById(26));
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
        pin.setUserId(3);
        return pin;
    }
}