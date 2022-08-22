package fiftygo.data;

import fiftygo.models.Pin;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class PinJdbcTemplateRepository implements PinRepository{

    private final JdbcTemplate jdbcTemplate;

    public PinJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Pin> findAll() {
        return null;
    }

    @Override
    public List<Pin> findByUsername(String username) {
        return null;
    }

    @Override
    public Pin findById(int pinId) {
        return null;
    }

    @Override
    public Pin add(Pin pin) {
        return null;
    }

    @Override
    public boolean update(Pin pin) {
        return false;
    }

    @Override
    public boolean deleteById(int pinId) {
        return false;
    }
}
