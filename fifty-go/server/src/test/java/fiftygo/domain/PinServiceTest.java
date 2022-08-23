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

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
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

        when(repository.add(arg)).thenReturn(expected);
        Result<Pin> result = service.add(arg);

        assertEquals(ResultType.SUCCESS, result.getResultType());
        assertEquals(expected, result.getPayload());
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