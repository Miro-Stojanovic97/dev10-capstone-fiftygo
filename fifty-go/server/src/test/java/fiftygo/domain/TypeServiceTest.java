package fiftygo.domain;

import fiftygo.data.TypeRepository;
import fiftygo.models.Type;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


@SpringBootTest
class TypeServiceTest {

    @Autowired
    TypeService service;

    @MockBean
    TypeRepository repository;

    @Test
    void shouldAddValidType() {
        Type expected = makeType();
        Type arg = makeType();
        arg.setTypeId(0);

        try {
            when(repository.add(arg)).thenReturn(expected);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
        Result<Type> result = service.add(arg);

        assertEquals(ResultType.SUCCESS, result.getResultType());
        assertEquals(expected, result.getPayload());
    }

    @Test
    void shouldNotAddTypeWithNullName() {
        Type arg = makeType();
        arg.setTypeId(0);
        arg.setTypeName(null);

        Result<Type> result = service.add(arg);

        assertEquals(ResultType.INVALID, result.getResultType());
    }

    @Test
    void shouldUpdateValidType() {
        Type arg = makeType();
        arg.setTypeName("updated name");

        try {
            when(repository.update(arg)).thenReturn(true);
        } catch (fiftygo.data.DataAccessException e) {
            throw new RuntimeException(e);
        }
        Result<Type> result = service.update(arg);

        assertEquals(ResultType.SUCCESS, result.getResultType());
        assertEquals(arg, result.getPayload());
    }

    @Test
    void shouldNotUpdateTypeWithNullName() {
        Type arg = makeType();
        arg.setTypeName(null);

        Result<Type> result = service.update(arg);
        assertEquals(ResultType.INVALID, result.getResultType());
    }

    private Type makeType(){
        Type type = new Type();
        type.setTypeName("golf");
        return type;
    }

}