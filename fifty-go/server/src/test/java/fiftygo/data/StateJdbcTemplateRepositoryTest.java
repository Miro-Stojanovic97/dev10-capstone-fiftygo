package fiftygo.data;

import fiftygo.models.State;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class StateJdbcTemplateRepositoryTest {

    @Autowired
    StateJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAllStates() {
        List<State> states = null;
        try {
            states = repository.findAll();
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertNotNull(states);
        assertEquals(52, states.size());
    }
}