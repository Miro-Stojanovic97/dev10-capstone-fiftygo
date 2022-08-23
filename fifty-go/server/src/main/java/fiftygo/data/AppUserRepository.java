package fiftygo.data;

import fiftygo.models.AppUser;
import fiftygo.models.Pin;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AppUserRepository {

    List<AppUser> findAll();

    AppUser findByUsername(String username);

    AppUser findById(int appUserId);

    AppUser create(AppUser appUser);

    boolean update(AppUser appUser);

    @Transactional
    boolean deleteById(int appUserId);
}
