package fiftygo.data;

import fiftygo.models.Type;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TypeRepository {

    List<Type> findAll();

    Type findById(int typeId);

    Type add(Type type);

    boolean update(Type type);

    @Transactional
    boolean deleteById(int typeId);
}
