package fiftygo.data;

import fiftygo.data.mappers.CityMapper;
import fiftygo.models.City;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class CityJdbcTemplateRepository implements CityRepository{

    private final JdbcTemplate jdbcTemplate;

    public CityJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<City> findAll() {
        final String sql = "select city_id, city_name, state_abr, state_name, city_latitude, city_longitude from city;";
        return jdbcTemplate.query(sql, new CityMapper());
    }

    @Override
    public City findById(int cityId) {

        final String sql = "select city_id, city_name, state_abr, state_name, city_latitude, city_longitude from city where city_id = ?;";
        return jdbcTemplate.queryForObject(sql, new CityMapper(), cityId);
    }

    @Override
    public City add(City city) {
        final String sql = """
                insert into city (city_id, city_name, state_abr, state_name, city_latitude, city_longitude)
                	values
                	(?, ?, ?, ?, ?, ?);
                """;
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, PreparedStatement.NO_GENERATED_KEYS);
            ps.setInt(1, city.getCityId());
            ps.setString(2, city.getCityName());
            ps.setString(3, city.getStateAbr());
            ps.setString(4, city.getStateName());
            ps.setBigDecimal(5, city.getLatitude());
            ps.setBigDecimal(6, city.getLongitude());
            return ps;
        });

        if (rowsAffected <= 0) {
            return null;
        }
        return city;
    }

    @Override
    public boolean update(City city) {
        return false;
    }

    @Override
    public boolean deleteById(int cityId) {
        return false;
    }
}
