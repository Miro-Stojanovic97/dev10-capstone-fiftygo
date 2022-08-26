package fiftygo.data;

import fiftygo.models.AppUser;

import java.util.List;

public interface AppUserRepository {

    List<AppUser> findAll() throws DataAccessException;

    AppUser findByUsername(String username) throws DataAccessException;

    AppUser createAccount(AppUser appUser) throws DataAccessException;

    boolean update(AppUser appUser) throws DataAccessException;

    boolean deleteById(int appUserId) throws DataAccessException;

}
