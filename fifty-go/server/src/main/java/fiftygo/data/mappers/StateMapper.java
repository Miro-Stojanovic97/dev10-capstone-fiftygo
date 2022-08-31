package fiftygo.data.mappers;

import fiftygo.models.State;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class StateMapper implements RowMapper<State> {
    @Override
    public State mapRow(ResultSet rs, int rowNum) throws SQLException {
        State state = new State();
        state.setStateAbr(rs.getString("state_abr"));
        state.setStateName(rs.getString("state_name"));
        return state;
    }
}
