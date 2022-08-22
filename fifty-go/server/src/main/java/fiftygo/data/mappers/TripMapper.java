package fiftygo.data.mappers;

public class TripMapper implements RowMapper<Trip> {

    public Trip mapRow(ResultSet resultSet, int i) {
        Trip trip = new Trip();

        trip.setTripId(resultSet.getInt("trip_id"));
        trip.setTripDescription(resultSet.getString("trip_description"));
        trip.setStartDate(resultSet.getDate("trip_start_date").toLocalDate());
        trip.setEndDate(resultSet.getDate("trip_end_date").toLocalDate());
        trip.setTransportation(resultSet.getString("transportation"));
        trip.setTripPriority(resultSet.getInt("trip_priority"));
        trip.setTripDidIt(resultSet.getBoolean("trip_did_it"));
        trip.setUserId(resultSet.getInt("user_id"));
        return trip;
    }
}
