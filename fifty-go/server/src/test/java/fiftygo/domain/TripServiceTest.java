package fiftygo.domain;

import fiftygo.data.DataAccessException;
import fiftygo.data.TripRepository;
import fiftygo.models.City;
import fiftygo.models.Pin;
import fiftygo.models.Trip;
import fiftygo.models.Type;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


@SpringBootTest
class TripServiceTest {

    @Autowired
    TripService service;

    @MockBean
    TripRepository repository;

    @Test
    void shouldAddValidTrip() {
        Trip expected = makeTrip();
        Trip arg = makeTrip();
        arg.setTripId(0);

        try {
            when(repository.add(arg)).thenReturn(expected);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
        Result<Trip> result = service.add(arg);

        assertEquals(ResultType.SUCCESS, result.getResultType());
        assertEquals(expected, result.getPayload());
    }

    @Test
    void shouldNotAddNullDescription() {
        Trip arg = makeTrip();
        arg.setTripId(0);
        arg.setTripDescription(null);

        Result<Trip> result = service.add(arg);
        assertEquals(ResultType.INVALID, result.getResultType());
    }

    @Test
    void shouldNotAddInvalidPriority() {
        Trip arg = makeTrip();
        arg.setTripId(0);
        arg.setTripPriority(7);

        Result<Trip> result = service.add(arg);
        assertEquals(ResultType.INVALID, result.getResultType());
    }

    @Test
    void shouldUpdateValidTrip() {
        Trip arg = makeTrip();
        arg.setTripDescription("updated description");

        try {
            when(repository.update(arg)).thenReturn(true);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
        Result<Trip> result = service.update(arg);

        assertEquals(ResultType.SUCCESS, result.getResultType());
        assertEquals(arg, result.getPayload());
    }

    @Test
    void shouldNotUpdateNullDescription() {
        Trip arg = makeTrip();
        arg.setTripDescription(null);

        Result<Trip> result = service.update(arg);
        assertEquals(ResultType.INVALID, result.getResultType());
    }

    @Test
    void shouldNotUpdateInvalidPriority() {
        Trip arg = makeTrip();
        arg.setTripPriority(9);

        Result<Trip> result = service.update(arg);
        assertEquals(ResultType.INVALID, result.getResultType());
    }

    @Test
    void shouldAddPinToTrip() throws DataAccessException {

        try {
            when(repository.addPinToTrip(1, 3)).thenReturn(true);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
        Result<Trip> result = service.addPinToTrip(1, 3);
        assertEquals(ResultType.SUCCESS, result.getResultType());
    }

    private Trip makeTrip() {
        Trip newTrip = new Trip();
        newTrip.setTripDescription("test description");
        newTrip.setTripStartDate(LocalDate.of(2023,9,15));
        newTrip.setTripEndDate(LocalDate.of(2023,9,20));
        newTrip.setTransportation("bus");
        newTrip.setTripPriority(1);
        newTrip.setTripDidIt(false);
        newTrip.setAppUserId(1);
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