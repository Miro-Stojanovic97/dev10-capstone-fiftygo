package fiftygo.data.mappers;

import fiftygo.models.City;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CityMapper implements RowMapper<City> {

    @Override
    public City mapRow(ResultSet rs, int rowNum) throws SQLException {
        City city = new City();
        return null;
    }
}
