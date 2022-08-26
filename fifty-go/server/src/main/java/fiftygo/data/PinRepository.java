package fiftygo.data;

import fiftygo.models.Pin;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PinRepository {

    List<Pin> findAll() throws DataAccessException;

    List<Pin> findByUserId(int userId) throws DataAccessException;

    Pin findById(int pinId) throws DataAccessException;

    Pin add(Pin pin) throws DataAccessException;

    boolean update(Pin pin) throws DataAccessException;

    @Transactional
    boolean deleteById(int pinId) throws DataAccessException;

}
