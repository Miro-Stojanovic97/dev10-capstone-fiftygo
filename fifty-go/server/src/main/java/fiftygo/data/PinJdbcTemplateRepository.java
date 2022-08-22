package fiftygo.data;

import fiftygo.data.mappers.CityMapper;
import fiftygo.data.mappers.PinMapper;
import fiftygo.models.City;
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
        final String sql = "";
        return jdbcTemplate.query(sql, new PinMapper());
    }

    @Override
    public List<Pin> findByUserId(int userId) {
        final String sql = "select pin_id, pin_description, pin_date, pin_priority, pin_did_it, user_id " +
                "from pin " +
                "where user_id = ?;";
        return jdbcTemplate.query(sql, new PinMapper(), userId);
    }

    @Override
    public Pin findById(int pinId) {
        final String sql = "select pin_id, pin_description, pin_date, pin_priority, pin_did_it, user_id " +
                "from pin " +
                "where pin_id = ?;";
        return jdbcTemplate.queryForObject(sql, new PinMapper(), pinId);
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

    private void addCity(Pin pin) {
        final String sql = "";
        City city = jdbcTemplate.queryForObject(sql, new CityMapper(), pin.getPinId());
        pin.setCity(city);
    }
}

