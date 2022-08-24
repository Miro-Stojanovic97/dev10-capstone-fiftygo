package fiftygo.data;

import fiftygo.data.mappers.CityMapper;
import fiftygo.data.mappers.PinMapper;
import fiftygo.data.mappers.TripMapper;
import fiftygo.data.mappers.TypeMapper;
import fiftygo.models.City;
import fiftygo.models.Pin;
import fiftygo.models.Trip;
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
public class TripJdbcTemplateRepository implements TripRepository{

    private final JdbcTemplate jdbcTemplate;

    public TripJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Trip> findAll() {
        final String sql = "select trip_id, trip_description, trip_start_date, " +
                "trip_end_date, transportation, trip_priority, trip_did_it, user_id " +
                "from trip;";
        List<Trip> trips = jdbcTemplate.query(sql, new TripMapper());
        trips.forEach(this::addPins);
        return trips;
    }

    @Override
    public List<Trip> findByUserId(int userId) {
        final String sql = "select trip_id, trip_description, trip_start_date, " +
                "trip_end_date, transportation, trip_priority, trip_did_it, user_id " +
                "from trip " +
                "where user_id = ?;";
        List<Trip> trips = jdbcTemplate.query(sql, new TripMapper(), userId);
        trips.forEach(this::addPins);
        return trips;
    }

    @Override
    public Trip findById(int tripId) {
        final String sql = "select trip_id, trip_description, trip_start_date, " +
                "trip_end_date, transportation, trip_priority, trip_did_it, user_id " +
                "from trip " +
                "where trip_id = ?;";
        Trip trip = jdbcTemplate.query(sql, new TripMapper(), tripId).stream()
                .findFirst().orElse(null);

        if (trip != null) {
            addPins(trip);
        }
        return trip;
    }

    @Override
    public Trip add(Trip trip) {
        final String sql = "insert into trip (trip_description, trip_start_date, trip_end_date, transportation, trip_priority, trip_did_it, user_id) " +
                "values (?,?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, trip.getTripDescription());
            ps.setDate(2, trip.getTripStartDate() == null ? null : Date.valueOf(trip.getTripStartDate()));
            ps.setDate(3, trip.getTripEndDate() == null ? null : Date.valueOf(trip.getTripEndDate()));
            if (trip.getTransportation() != null) {
                ps.setString(4, trip.getTransportation());
            } else {
                ps.setString(4, null);
            }
            ps.setInt(5, trip.getTripPriority());
            ps.setBoolean(6, trip.isTripDidIt());
            ps.setInt(7, trip.getUserId());
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0){
            return null;
        }

        trip.setTripId(keyHolder.getKey().intValue());
        return trip;
    }

    @Override
    public boolean update(Trip trip) {
        final String sql = "update trip set trip_description = ?, " +
                "trip_start_date = ?, trip_end_date = ?, transportation = ?, " +
                "trip_priority = ?, trip_did_it = ?;";

        return jdbcTemplate.update(sql,
                trip.getTripDescription(),
                trip.getTripStartDate(),
                trip.getTripEndDate(),
                trip.getTransportation(),
                trip.getTripPriority(),
                trip.isTripDidIt()) > 0;
    }

    @Override
    public boolean deleteById(int tripId) {
        jdbcTemplate.update("delete from pin_trip where trip_id = ?;", tripId);
        return jdbcTemplate.update("delete from trip where trip_id = ?;", tripId) > 0;
    }


    private void addPins(Trip trip){
        final String sql = "select p.pin_id, p.pin_description, p.pin_date, p.pin_priority, p.pin_did_it, p.user_id " +
                "from pin p " +
                "inner join pin_trip on p.pin_id = pin_trip.pin_id " +
                "inner join trip on pin_trip.trip_id = trip.trip_id " +
                "where trip.trip_id = ?;";
        List<Pin> pins = jdbcTemplate.query(sql, new PinMapper(), trip.getTripId());
        pins.forEach(this::addCity);
        pins.forEach(this::addType);
        trip.setPins(pins);
    }

    void addCity(Pin pin) {
        final String sql = "select " +
                "city.city_id, city.city_name, city.state_abr, city.state_name, city.city_latitude, city.city_longitude " +
                "from city " +
                "inner join pin on city.city_id = pin.city_id where pin_id = ?;";
        City city = jdbcTemplate.queryForObject(sql, new CityMapper(), pin.getPinId());
        pin.setCity(city);
    }

    void addType(Pin pin) {
        final String sql = "select " +
                "`type`.type_id, `type`.type_name " +
                "from `type` " +
                "inner join pin on `type`.type_id = pin.type_id where pin_id = ?;";
        Type type = jdbcTemplate.queryForObject(sql, new TypeMapper(), pin.getPinId());
        pin.setType(type);
    }
}
