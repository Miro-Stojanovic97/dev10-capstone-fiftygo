package fiftygo.data;

import fiftygo.models.AppUser;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AppUserRepository {

//    List<AppUser> findAll();

    AppUser findByUsername(String username);

    AppUser createAccount(AppUser appUser);

    boolean update(AppUser appUser);

    boolean deleteById(int appUserId);

}
