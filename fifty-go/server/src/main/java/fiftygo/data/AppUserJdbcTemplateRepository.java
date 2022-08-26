package fiftygo.data;

import fiftygo.data.mappers.AppUserMapper;
import fiftygo.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Repository
public class AppUserJdbcTemplateRepository implements AppUserRepository{

    private final JdbcTemplate jdbcTemplate;

    public AppUserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    public List<AppUser> findAll() throws DataAccessException {
        List<String> roles = new ArrayList<>();
        final String sql = "select user_id, first_name, last_name, username, password_hash, disabled from `user`;";
        return jdbcTemplate.query(sql, new AppUserMapper(roles));
    }

    @Transactional
    public AppUser findByUsername(String username) throws DataAccessException {
        List<String> roles = getRolesByUsername(username);

        final String sql = """
                select
                    user_id,
                    first_name,
                    last_name,
                    username,
                    password_hash,
                    disabled
                from `user`
                where username = ?;
                """;

        return jdbcTemplate.query(sql, new AppUserMapper(roles), username)
                .stream()
                .findFirst().orElse(null);
    }

    @Transactional
    public AppUser createAccount(AppUser user) throws DataAccessException {

        final String sql = "insert into `user` (first_name, last_name, username, password_hash) values (?, ?, ?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getFirstName());
            ps.setString(2, user.getLastName());
            ps.setString(3, user.getUsername());
            ps.setString(4, user.getPassword());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        user.setAppUserId(keyHolder.getKey().intValue());

        updateRoles(user);

        return user;
    }

    @Transactional
    public boolean update(AppUser user) throws DataAccessException {

        final String sql = """
                update `user` set
                    first_name = ?,
                    last_name = ?,
                    username = ?,
                    disabled = ?
                where user_id = ?
                """;

        boolean updated = jdbcTemplate.update(
                sql,
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                !user.isEnabled(),
                user.getAppUserId()
        ) > 0;

        if (updated) {
            updateRoles(user);
        }
        return updated;
    }

    @Override
    public boolean deleteById(int appUserId) throws DataAccessException {
        jdbcTemplate.update("delete from user_role where user_id = ?;", appUserId);
        return jdbcTemplate.update("delete from `user` where user_id = ?;", appUserId) > 0;
    }

    private void updateRoles(AppUser user) {
        // delete all roles, then re-add
        jdbcTemplate.update("delete from user_role where user_id = ?;", user.getAppUserId());

        Collection<GrantedAuthority> authorities = user.getAuthorities();

        if (authorities == null) {
            return;
        }

        for (String role : AppUser.convertAuthoritiesToRoles(authorities)) {
            String sql = """
                    insert into user_role (user_id, role_id)
                    select
                        ?,
                        role_id
                    from `role` where role_name = ?;
                    """;
            jdbcTemplate.update(sql, user.getAppUserId(), role);
        }
    }

    private List<String> getRolesByUsername(String username) { // gets roles from db, adds to list of roles.
        final String sql = """
                select
                    r.role_name
                from user_role ur
                inner join `role` r on ur.role_id = r.role_id
                inner join `user` u on ur.user_id = u.user_id
                where u.username = ?;
                """;
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("role_name"), username);
    }
}
