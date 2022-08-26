package fiftygo.data;

import fiftygo.models.Type;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TypeRepository {

    List<Type> findAll() throws DataAccessException;

    Type findById(int typeId) throws DataAccessException;

    List<Type> searchTypes(String sequence) throws DataAccessException;

    Type add(Type type) throws DataAccessException;

    boolean update(Type type) throws DataAccessException;

    @Transactional
    boolean deleteById(int typeId) throws DataAccessException;
}
