package fiftygo.data.mappers;

import fiftygo.models.Pin;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PinMapper implements RowMapper<Pin> {

    @Override
    public Pin mapRow(ResultSet rs, int rowNum) throws SQLException {
        Pin pin = new Pin();
        pin.setPinId(rs.getInt("pin_id"));
        pin.setPinDescription(rs.getString("pin_description"));
        if (rs.getDate("pin_date") != null) {
            pin.setPinDate(rs.getDate("pin_date").toLocalDate());
        }
        pin.setCityId(rs.getInt("city_id"));
        pin.setTypeId(rs.getInt("type_id"));
        pin.setPinPriority(rs.getInt("pin_priority"));
        pin.setPinDidIt(rs.getBoolean("pin_did_it"));
        pin.setAppUserId(rs.getInt("user_id"));
        return pin;
    }
}
