package fiftygo.data;

import fiftygo.data.mappers.AppUserMapper;
import fiftygo.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Repository
public class AppUserJdbcTemplateRepository implements AppUserRepository{

    private final JdbcTemplate jdbcTemplate;

    public AppUserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<AppUser> findAll() {
        return null;
    }

    @Override
    @Transactional
    public AppUser findByUsername(String username) {
        List<String> roles = getRolesByUsername(username);

        final String sql = "select user_id, first_name, last_name, username, password_hash, disabled " +
                "from `user` " +
                "where username = ?;";
        return jdbcTemplate.query(sql, new AppUserMapper(roles), username)
                .stream()
                .findFirst().orElse(null);
        return null;
    }



    @Override
    public AppUser findById(int appUserId) {
        return null;
    }

    @Override
    public AppUser create(AppUser appUser) {
        return null;
    }

    @Override
    @Transactional
    public void update(AppUser appUser){

        final String sql = "update `user` set "
                + "username = ?, "
                + "disabled = ? "
                + "where user_id = ?";

        jdbcTemplate.update(sql,
                appUser.getUsername(), !appUser.isEnabled(), appUser.getId());

        updateRoles(appUser);
    }

    private void updateRoles(AppUser appUser) {
        // delete all roles, then re-add
        jdbcTemplate.update("delete from user_role where user_id = ?;", appUser.getId());

        Collection<GrantedAuthority> authorities = appUser.getAuthorities();

        if (authorities == null) {
            return;
        }

        for (String role : AppUser.convertAuthoritiesToRoles(authorities)) {
            String sql = "insert into user_role (user_id, role_id) "
                    + "select ?, role_id from `role` where role_name = ?;";
            jdbcTemplate.update(sql, appUser.getId(), role);
        }
    }

    @Override
    public boolean deleteById(int appUserId) {
        return false;
    }
    private List<String> getRolesByUsername(String username) {
        final String sql = "select r.role_name " +
                "from user_role ur " +
                "inner join `role` r on ur.role_id = r.role_id " +
                "inner join `user` u on ur.user_id = u.user_id " +
                "where u.username = ?;";
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("role_name"), username);
    }
}
