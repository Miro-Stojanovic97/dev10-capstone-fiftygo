package fiftygo.data;

import org.springframework.jdbc.core.JdbcTemplate;

public class TripJdbcTemplateRepository {

    private final JdbcTemplate jdbcTemplate;

    public TripJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


}
