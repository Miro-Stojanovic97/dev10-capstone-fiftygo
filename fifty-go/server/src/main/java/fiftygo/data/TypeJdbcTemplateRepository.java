package fiftygo.data;

import fiftygo.data.mappers.TypeMapper;
import fiftygo.models.Type;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.JDBCType;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class TypeJdbcTemplateRepository implements TypeRepository{

    private final JdbcTemplate jdbcTemplate;

    public TypeJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Type> findAll() {
        final String sql = "select type_id, type_name from type;";
        return jdbcTemplate.query(sql, new TypeMapper());
    }

    @Override
    public Type findById(int typeId) {
        final String sql = "select type_id, type_name from type where type_id = ?;";
        return jdbcTemplate.query(sql, new TypeMapper(), typeId).stream()
                .findFirst().orElse(null);
    }

    @Override
    public Type add(Type type) {
        final String sql = "insert into type (type_name) values (?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, type.getTypeName());
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0) {
            return null;
        }

        type.setTypeId(keyHolder.getKey().intValue());
        return type;
    }

    @Override
    public boolean update(Type type) {
        final String sql = "update type set type_name = ?;";
        return jdbcTemplate.update(sql, type.getTypeName()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int typeId) {
        return jdbcTemplate.update("delete from type where type_id = ?;", typeId) > 0;
    }
}
