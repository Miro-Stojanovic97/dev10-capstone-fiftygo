package fiftygo.data;

import fiftygo.data.mappers.CityMapper;
import fiftygo.data.mappers.PinMapper;
import fiftygo.data.mappers.TypeMapper;
import fiftygo.models.City;
import fiftygo.models.Pin;
import fiftygo.models.Type;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class PinJdbcTemplateRepository implements PinRepository{

    private final JdbcTemplate jdbcTemplate;

    public PinJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Pin> findAll() throws DataAccessException {
        final String sql = "select pin_id, pin_description, pin_date, pin_priority, pin_did_it, user_id from pin;";
        List<Pin> pins = jdbcTemplate.query(sql, new PinMapper());
        pins.forEach(this::addCity);
        pins.forEach(this::addType);
        return pins;
    }

    @Override
    public List<Pin> findByUserId(int userId) throws DataAccessException {
        final String sql = "select pin_id, pin_description, pin_date, pin_priority, pin_did_it, user_id " +
                "from pin " +
                "where user_id = ?;";
        List<Pin> pins = jdbcTemplate.query(sql, new PinMapper(), userId);
        pins.forEach(this::addCity);
        pins.forEach(this::addType);
        return pins;
    }

    @Override
    public Pin findById(int pinId) throws DataAccessException {
        final String sql = "select pin_id, pin_description, pin_date, pin_priority, pin_did_it, user_id " +
                "from pin " +
                "where pin_id = ?;";
        Pin pin = jdbcTemplate.query(sql, new PinMapper(), pinId).stream()
                .findFirst().orElse(null);
        if (pin != null) {
            addCity(pin);
            addType(pin);
        }
        return pin;
    }

    @Override
    public Pin add(Pin pin) throws DataAccessException {
        final String sql = "insert into pin (pin_description, pin_date, pin_priority, pin_did_it, type_id, city_id, user_id) " +
                "values (?, ?, ?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, pin.getPinDescription());
            ps.setDate(2, pin.getPinDate() == null ? null : Date.valueOf(pin.getPinDate()));
            ps.setInt(3, pin.getPinPriority());
            ps.setBoolean(4, pin.getPinDidIt());
            if (pin.getType() != null) {
                ps.setInt(5, pin.getType().getTypeId());
            } else {
                ps.setString(5, null);
            }
            ps.setInt(6, pin.getCity().getCityId());
            ps.setInt(7, pin.getAppUserId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        pin.setPinId(keyHolder.getKey().intValue());
        return pin;
    }

    @Override
    public boolean update(Pin pin) throws DataAccessException {

        final String sql = "update pin set "
                + "pin_description = ?, "
                + "pin_date = ?, "
                + "pin_priority = ?, "
                + "pin_did_it = ? "
                + "where pin_id = ?;";

        return jdbcTemplate.update(sql,
                pin.getPinDescription(),
                pin.getPinDate(),
                pin.getPinPriority(),
                pin.getPinDidIt(),
                pin.getPinId()) > 0;
    }

    @Override
    public boolean deleteById(int pinId) throws DataAccessException {
        jdbcTemplate.update("delete from pin_trip where pin_id = ?;", pinId);
        return jdbcTemplate.update("delete from pin where pin_id = ?;", pinId) > 0;
    }

    // tripRepo needs access to this method
    void addCity(Pin pin) {
        final String sql = "select " +
                "city.city_id, city.city_name, city.state_abr, city.state_name, city.city_latitude, city.city_longitude " +
                "from city " +
                "inner join pin on city.city_id = pin.city_id where pin_id = ?;";
        City city = jdbcTemplate.queryForObject(sql, new CityMapper(), pin.getPinId());
        pin.setCity(city);
    }

    // tripRepo needs access to this method
    void addType(Pin pin) {
        final String sql = "select " +
                "`type`.type_id, `type`.type_name " +
                "from `type` " +
                "inner join pin on `type`.type_id = pin.type_id where pin_id = ?;";
        Type type = jdbcTemplate.queryForObject(sql, new TypeMapper(), pin.getPinId());
        pin.setType(type);
    }
}

