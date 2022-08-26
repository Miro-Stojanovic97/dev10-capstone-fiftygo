package fiftygo.domain;

import fiftygo.data.PinRepository;
import fiftygo.models.City;
import fiftygo.models.Pin;
import fiftygo.models.Type;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class PinServiceTest {

    @Autowired
    PinService service;

    @MockBean
    PinRepository repository;

    @Test
    void shouldAddValidPin() {
        Pin expected = makePin();
        Pin arg = makePin();
        arg.setPinId(0);

        try {
            when(repository.add(arg)).thenReturn(expected);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
        Result<Pin> result = service.add(arg);

        assertEquals(ResultType.SUCCESS, result.getResultType());
        assertEquals(expected, result.getPayload());
    }

    @Test
    void shouldNotAddInvalidPin() {
        Pin arg = makePin();
        arg.setPinId(0);
        arg.setPinDescription(null);

        Result<Pin> result = service.add(arg);

        assertEquals(ResultType.INVALID, result.getResultType());
    }

    @Test
    void shouldUpdateValidPin() {
        Pin arg = makePin();
        arg.setPinId(1);

        try {
            when(repository.update(arg)).thenReturn(true);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
        Result<Pin> result = service.update(arg);

        assertEquals(ResultType.SUCCESS, result.getResultType());
        assertEquals(arg, result.getPayload());
    }

    @Test
    void shouldUpdateValidNullType() {
        Pin arg = makePin();
        arg.setPinId(1);
        arg.setType(null);

        try {
            when(repository.update(arg)).thenReturn(true);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
        Result<Pin> result = service.update(arg);

        assertEquals(ResultType.SUCCESS, result.getResultType());
        assertEquals(arg, result.getPayload());
    }

    @Test
    void shouldNotUpdateInvalidDescription() {
        Pin arg = makePin();
        arg.setPinId(1);
        arg.setPinDescription(null);

        Result<Pin> result = service.update(arg);
        assertEquals(ResultType.INVALID, result.getResultType());

        arg.setPinDescription("This is a test description in which I would like for the character count to be higher than the allotted 300 character max for a Pin's description. It seems like 300 characters should be enough to give a decent description of what you'd like to do at your pin. Any more than 300 is just too verbose, right?");
        result = service.update(arg);
        assertEquals(ResultType.INVALID, result.getResultType());
    }

    @Test
    void shouldNotUpdateInvalidPriority() {
        Pin arg = makePin();
        arg.setPinId(1);
        arg.setPinPriority(0);

        Result<Pin> result = service.update(arg);
        assertEquals(ResultType.INVALID, result.getResultType());

        arg.setPinPriority(6);
        result = service.update(arg);
        assertEquals(ResultType.INVALID, result.getResultType());
    }

    @Test
    void shouldNotUpdateInvalidCity() {
        Pin arg = makePin();
        arg.setPinId(1);
        arg.setCity(null);

        Result<Pin> result = service.update(arg);
        assertEquals(ResultType.INVALID, result.getResultType());
    }

    @Test
    void shouldNotUpdateInvalidUserId() {
        Pin arg = makePin();
        arg.setPinId(0);

        Result<Pin> result = service.update(arg);
        assertEquals(ResultType.NOT_FOUND, result.getResultType());

        arg.setPinId(9999);
        result = service.update(arg);
        assertEquals(ResultType.NOT_FOUND, result.getResultType());
    }


    private Pin makePin() {
        City city = new City(1840014730, "Columbia", "SC", "South Carolina",new BigDecimal("34.0378"),	new BigDecimal("-80.9036"));
        Type type = new Type(11, "sing");
        Pin pin = new Pin();
        pin.setPinId(1);
        pin.setPinDescription("Suspendisse potenti.");
        pin.setPinDate(LocalDate.of(2023, 8,3));
        pin.setPinPriority(5);
        pin.setPinDidIt(false);
        pin.setCity(city);
        pin.setType(type);
        pin.setUserId(3);
        return pin;
    }
}