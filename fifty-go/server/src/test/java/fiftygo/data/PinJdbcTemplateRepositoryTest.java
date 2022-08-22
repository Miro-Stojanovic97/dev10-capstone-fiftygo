package fiftygo.data;

import fiftygo.models.Pin;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class PinJdbcTemplateRepositoryTest {

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

        assertTrue(pins.size() == 30);
    }
}