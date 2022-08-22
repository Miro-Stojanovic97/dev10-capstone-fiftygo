package fiftygo.data;

import fiftygo.data.mappers.CityMapper;
import fiftygo.data.mappers.PinMapper;
import fiftygo.data.mappers.TypeMapper;
import fiftygo.models.City;
import fiftygo.models.Pin;
import fiftygo.models.Type;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PinJdbcTemplateRepository implements PinRepository{

    private final JdbcTemplate jdbcTemplate;

    public PinJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Pin> findAll() {
        final String sql = "select pin_id, pin_description, pin_date, pin_priority, pin_did_it,user_id from pin;";
        List<Pin> pins = jdbcTemplate.query(sql, new PinMapper());
        pins.forEach(this::addCity);
        pins.forEach(this::addType);
        return pins;
    }

    @Override
    public List<Pin> findByUserId(int userId) {
        final String sql = "select pin_id, pin_description, pin_date, pin_priority, pin_did_it, user_id " +
                "from pin " +
                "where user_id = ?;";
        List<Pin> pins = jdbcTemplate.query(sql, new PinMapper(), userId);
        pins.forEach(this::addCity);
        pins.forEach(this::addType);
        return pins;
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
        final String sql = "select " +
                "city.city_id, city.city_name, city.state_abr, city.state_name, city.city_latitude, city.city_longitude " +
                "from city " +
                "inner join pin on city.city_id = pin.city_id where pin_id = ?;";
        City city = jdbcTemplate.queryForObject(sql, new CityMapper(), pin.getPinId());
        pin.setCity(city);
    }

    private void addType(Pin pin) {
        final String sql = "select " +
                "`type`.type_id, `type`.type_name " +
                "from `type` " +
                "inner join pin on `type`.type_id = pin.type_id where pin_id = ?;";
        Type type = jdbcTemplate.queryForObject(sql, new TypeMapper(), pin.getPinId());
        pin.setType(type);
    }
}

