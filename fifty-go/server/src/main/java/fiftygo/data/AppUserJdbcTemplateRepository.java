package fiftygo.data;

import fiftygo.models.AppUser;

import java.util.List;

public class AppUserJdbcTemplateRepository implements AppUserRepository{
    @Override
    public List<AppUser> findAll() {
        return null;
    }

    @Override
    public AppUser findByUsername(String username) {
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
    public boolean update(AppUser appUser) {
        return false;
    }

    @Override
    public boolean deleteById(int appUserId) {
        return false;
    }
}
