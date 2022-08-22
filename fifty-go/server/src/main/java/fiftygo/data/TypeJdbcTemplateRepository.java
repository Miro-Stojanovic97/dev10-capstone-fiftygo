package fiftygo.data;

import fiftygo.models.Type;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TypeJdbcTemplateRepository implements TypeRepository{

    private final JdbcTemplate jdbcTemplate;

    public TypeJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Type> findAll() {
        return null;
    }

    @Override
    public Type findById(int typeId) {
        return null;
    }

    @Override
    public Type add(Type type) {
        return null;
    }

    @Override
    public boolean update(Type type) {
        return false;
    }

    @Override
    public boolean deleteById(int typeId) {
        return false;
    }
}
