package fiftygo.data;

import fiftygo.models.Trip;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class TripJdbcTemplateRepository implements TripRepository{

    private final JdbcTemplate jdbcTemplate;

    public TripJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


//    private final RowMapper<Trip> mapper = (resultSet, rowIndex) -> {
//        Trip trip = new Trip();
//
//        //insert rows from tables once created
//        return trip;
//    }

//    public List<Trip> findAll() {
//
//        final String sql = "select * from trip"
//    }


    @Override
    public List<Trip> findAll() {
        return null;
    }

    @Override
    public List<Trip> findByUsername(String username) {
        return null;
    }

    @Override
    public Trip findById(int tripId) {
        return null;
    }

    @Override
    public Trip add(Trip trip) {
        return null;
    }

    @Override
    public boolean update(Trip trip) {
        return false;
    }

    @Override
    public boolean deleteById(int tripId) {
        return false;
    }
}
