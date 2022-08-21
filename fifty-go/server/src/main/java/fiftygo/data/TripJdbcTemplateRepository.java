package fiftygo.data;

import org.springframework.jdbc.core.JdbcTemplate;

public class TripJdbcTemplateRepository {

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
}
