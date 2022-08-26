package fiftygo.data;

import fiftygo.models.Type;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
class TypeJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 35;

    @Autowired
    TypeJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Type> types = null;
        try {
            types = repository.findAll();
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertNotNull(types);
        assertTrue(types.size() >= 34);
    }

    @Test
    void shouldFindById() {
        Type expected = new Type(4, "walk");
        Type actual = null;
        try {
            actual = repository.findById(4);
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertNotNull(actual);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotFindByMissingId() {
        Type notType = null;
        try {
            notType = repository.findById(54);
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertNull(notType);
    }

    @Test
    void shouldAdd() {
        Type type = makeType();
        Type actual = null;
        try {
            actual = repository.add(type);
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getTypeId());
    }

    @Test
    void shouldUpdate() {
        Type type = makeType();
        type.setTypeName("updated name");
        type.setTypeId(36);
        try {
            assertTrue(repository.update(type));
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void shouldDeleteUnusedType() {
        try {
            assertTrue(repository.deleteById(19));
        } catch (DataAccessException e) {
            throw new RuntimeException(e);
        }
    }

    private Type makeType() {
        Type type = new Type();
        type.setTypeName("golf");
        return type;
    }
}