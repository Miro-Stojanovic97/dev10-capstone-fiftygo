package fiftygo.data;

import fiftygo.data.mappers.PinMapper;
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
        final String sql = "select pin_id, pin_description, pin_date, pin_priority, pin_did_it, user_id from pin;";

        return jdbcTemplate.query(sql, new PinMapper());
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
