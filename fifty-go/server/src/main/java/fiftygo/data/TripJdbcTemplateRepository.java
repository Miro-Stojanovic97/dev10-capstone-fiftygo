package fiftygo.data;

import fiftygo.data.mappers.TripMapper;
import fiftygo.models.Trip;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
        final String sql = "select trip_id, trip_description, trip_start_date," +
                " trip_end_date, transportation, trip_priority, trip_did_it, user_id" +
                " from trip;";
        return jdbcTemplate.query(sql, new TripMapper());
    }

    @Override
    public List<Trip> findByUsername(String username) {
        final String sql = "select trip_id, trip_description, trip_start_date," +
                " trip_end_date, transportation, trip_priority, trip_did_it, user_id" +
                " from trip" +
                " where user_id = ?;";
        return jdbcTemplate.query(sql, new TripMapper());
    }

    @Override
    public Trip findById(int tripId) {
        final String sql = "select trip_id, trip_description, trip_start_date," +
                " trip_end_date, transportation, trip_priority, trip_did_it, user_id" +
                " from trip" +
                " where trip_id = ?;";
        Trip trip = jdbcTemplate.query(sql, new TripMapper(), tripId).stream()
                .findFirst().orElse(null);

        return trip;
    }

    @Override
    public Trip add(Trip trip) {
        final String sql = "insert into trip (trip_id, trip_description, trip_start_date, trip_end_date, transportation, trip_priority, trip_did_it)" +
                " values (?,?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, trip.getTripDescription());
            ps.setDate(2, trip.getTripStartDate() == null ? null : Date.valueOf(trip.getTripStartDate()));
            ps.setDate(3, trip.getTripEndDate() == null ? null : Date.valueOf(trip.getTripEndDate()));
            ps.setString(4, trip.getTransportation());
            ps.setInt(5, trip.getTripPriority());
            ps.setBoolean(6, trip.isTripDidIt());
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
        final String sql = "update trip set trip_description = ?," +
                " trip_start_date = ?, trip_end_date = ?, transportation = ?," +
                " trip_priority = ?, trip_did_it = ?;";

        return jdbcTemplate.update(sql,
                trip.getTripDescription(),
                trip.getTripStartDate(),
                trip.getTripEndDate(),
                trip.getTransportation(),
                trip.getTripPriority(),
                trip.isTripDidIt()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int tripId) {
        return jdbcTemplate.update("delete from trip where trip_id = ?;", tripId) > 0;
    }


    //add pins
}
