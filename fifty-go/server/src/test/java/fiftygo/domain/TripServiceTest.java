package fiftygo.domain;

import fiftygo.data.TripRepository;
import fiftygo.models.Trip;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
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

        when(repository.add(arg)).thenReturn(expected);
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
    void shouldNotAddNullCity() {
        Trip arg = makeTrip();
        arg.setTripId(0);
        arg.setCity(null);

        Result<Trip> result = service.add(arg);
        assertEquals(ResultType.INVALID, result.getResultType());
    }

    @Test
    void shouldUpdateValidTrip() {
        Trip arg = makeTrip();
        arg.setTripDescription("updated description");

        when(repository.update(arg)).thenReturn(true);
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
    void shouldNotUpdateNullCity() {
        Trip arg = makeTrip();
        arg.setCity(null);

        Result<Trip> result = service.update(arg);
        assertEquals(ResultType.INVALID, result.getResultType());
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