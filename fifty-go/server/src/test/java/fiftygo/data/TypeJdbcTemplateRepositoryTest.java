package fiftygo.data;

import fiftygo.models.Type;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

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
        List<Type> types = repository.findAll();
        assertNotNull(types);
        assertTrue(types.size() >= 34);
    }

    @Test
    void shouldFindById() {
        Type expected = new Type(4, "walk");
        Type actual = repository.findById(4);
        assertNotNull(actual);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotFindByMissingId() {
        Type notType = repository.findById(54);
        assertNull(notType);
    }

    @Test
    void shouldAdd() {
        Type type = makeType();
        Type actual = repository.add(type);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getTypeId());
    }

    @Test
    void shouldUpdate() {
        Type type = makeType();
        type.setTypeName("updated name");
        type.setTypeId(36);
        assertTrue(repository.update(type));
    }

    @Test
    void shouldDeleteById() {
        assertTrue(repository.deleteById(20));
    }

    private Type makeType() {
        Type type = new Type();
        type.setTypeName("golf");
        return type;
    }
}