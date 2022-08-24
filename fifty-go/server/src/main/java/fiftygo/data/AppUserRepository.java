package fiftygo.data;

import fiftygo.models.AppUser;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AppUserRepository {

//    List<AppUser> findAll();

    AppUser findByUsername(String username);

    AppUser add(AppUser appUser);

    boolean update(AppUser appUser);

}
