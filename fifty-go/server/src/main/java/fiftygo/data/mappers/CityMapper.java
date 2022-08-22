package fiftygo.data.mappers;

import fiftygo.models.City;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CityMapper implements RowMapper<City> {

    @Override
    public City mapRow(ResultSet rs, int rowNum) throws SQLException {
        City city = new City();
        city.setCityId(rs.getInt("city_id"));
        city.setCityName(rs.getString("city_name"));
        city.setStateAbr(rs.getString("state_abr"));
        city.setStateName(rs.getString("state_name"));
        city.setLatitude(rs.getBigDecimal("city_latitude"));
        city.setLongitude(rs.getBigDecimal("city_longitude"));
        return city;
    }
}
