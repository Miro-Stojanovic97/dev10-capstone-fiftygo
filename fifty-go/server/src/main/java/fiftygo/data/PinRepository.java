package fiftygo.data;

import fiftygo.models.Pin;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PinRepository {

    List<Pin> findAll();

    List<Pin> findByUserId(int userId);

    Pin findById(int pinId);

    Pin add(Pin pin);

    boolean update(Pin pin);

    @Transactional
    boolean deleteById(int pinId);

}
