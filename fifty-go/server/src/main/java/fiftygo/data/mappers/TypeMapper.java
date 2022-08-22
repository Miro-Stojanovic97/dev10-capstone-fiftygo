package fiftygo.data.mappers;

import fiftygo.models.Type;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TypeMapper implements RowMapper<Type> {

    public Type mapRow(ResultSet resultSet, int i) throws SQLException {
        Type type = new Type();

        type.setTypeId(resultSet.getInt("type_id"));
        type.setTypeName(resultSet.getString("type_name"));
        return type;
    }
}
