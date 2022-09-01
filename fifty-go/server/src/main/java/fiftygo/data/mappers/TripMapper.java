package fiftygo.data.mappers;

import fiftygo.models.Trip;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TripMapper implements RowMapper<Trip> {

    public Trip mapRow(ResultSet resultSet, int i) throws SQLException {
        Trip trip = new Trip();

        trip.setTripId(resultSet.getInt("trip_id"));
        trip.setTripDescription(resultSet.getString("trip_description"));
        if (resultSet.getDate("trip_start_date") != null) {
            trip.setTripStartDate(resultSet.getDate("trip_start_date").toLocalDate());
        }
        if (resultSet.getDate("trip_end_date") != null) {
            trip.setTripEndDate(resultSet.getDate("trip_end_date").toLocalDate());
        }
        trip.setTransportation(resultSet.getString("transportation"));
        trip.setTripPriority(resultSet.getInt("trip_priority"));
        trip.setTripDidIt(resultSet.getBoolean("trip_did_it"));
        trip.setAppUserId(resultSet.getInt("user_id"));
        return trip;
    }
}
