package fiftygo.data;

import fiftygo.models.Type;
import org.springframework.jdbc.core.JdbcTemplate;
import fiftygo.data.mappers.TripMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TypeJdbcTemplateRepository implements TypeRepository{

    private final JdbcTemplate jdbcTemplate;

    public TypeJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Type> findAll() {
        final String sql = "select trip_id, trip_description, trip_start_date," +
                " trip_end_date, transportation, trip_priority, trip_did_it, user_id" +
                " from trip;";
        return jdbcTemplate.query(sql, new TripMapper());
    }

    @Override
    public Type findById(int typeId) {
        final String sql = "select trip_id, trip_description, trip_start_date," +
                " trip_end_date, transportation, trip_priority, trip_did_it, user_id" +
                " from trip" +
                " where trip_id = ?;";
        Trip trip = jdbcTemplate.query(sql, new TripMapper(), tripId).stream
                .findFirst().orElse(null);

        return trip;
    }

    @Override
    public Type add(Type type) {
        final String sql = "insert into trip (trip_id, trip_description, trip_start_date, trip_end_date, transportation, trip_priority, trip_did_it)" +
                " values (?,?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, trip.getTripDescription());
            ps.setDate(2, trip.getTripStartDate());
            ps.setDate(3, trip.getTripEndDate());
            ps.setString(4, trip.getTransportation());
            ps.setInt(5, getTripPriority());
            ps.setBoolean(6, getTripDidIt());
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0){
            return null;
        }

        trip.setTripId(keyHolder.getKey().intValue());
        return trip;
    }

    @Override
    public boolean update(Type type) {
        final String sql = "update trip set trip_description = ?," +
                " trip_start_date = ?, trip_end_date = ?, transportation = ?," +
                " trip_priority = ?, trip_did_it = ?;";

        return jdbcTemplate.update(sql,
                trip.getTripDescription(),
                trip.getTripStartDate(),
                trip.getTripEndDate(),
                trip.getTransportation(),
                trip.getTripPriority(),
                trip.getTripDidIt()) > 0;
    }

    @Override
    public boolean deleteById(int typeId) {
        return jdbcTemplate.update("delete from trip where trip_id = ?;", tripId) > 0;
    }
}
