package fiftygo.data;

import fiftygo.App;
import fiftygo.models.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AppUserJdbcTemplateRepositoryTest {

    @Autowired
    AppUserJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAllUsers() {
        AppUser expected1 = new AppUser(
                1,
                "John",
                "Smith",
                "jsmith1",
                "$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa",
                false,
                Collections.singletonList("ADMIN"));
        AppUser expected2 = new AppUser(
                2,
                "Jane",
                "Smith",
                "jsmith2",
                "$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa",
                false,
                Collections.singletonList("PREMIUM"));

        List<AppUser> appUsers = repository.findAll();
        System.out.println(appUsers);
        assertTrue(appUsers.contains(expected1) && appUsers.contains(expected2));
        assertEquals(expected1.getFirstName(), appUsers.get(0).getFirstName());
        assertEquals(expected2.getFirstName(), appUsers.get(1).getFirstName());
    }

    @Test
    void shouldFindAppUserByExistingUsername() {
        AppUser expected = new AppUser(
                1,
                "John",
                "Smith",
                "jsmith1",
                "$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa",
                false,
                Collections.singletonList("ADMIN"));
        AppUser actual = repository.findByUsername("jsmith1");

        assertEquals("John", actual.getFirstName());
        assertEquals("Smith", actual.getLastName());
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotFindByMissingUsername() {
        AppUser actual = repository.findByUsername("jsmith99");

        assertNull(actual);
    }

    @Test
    void shouldCreateValidUser() {
        AppUser expected = new AppUser(
                5,
                "Julie",
                "Smith",
                "jsmith4",
                "$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa",
                false,
                Collections.singletonList("PREMIUM"));
        AppUser actual = makeAppUser();
        actual.setAppUserId(0);
        repository.createAccount(actual);

        assertEquals(expected, actual);
    }

    @Test
    void shouldUpdateExistingValidAppUser() {

        AppUser actual = new AppUser(
                3,
                "Jennifer",
                "Smith",
                "jsmith3",
                "$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa",
                false,
                Collections.singletonList("PREMIUM"));
        boolean result = repository.update(actual);

        assertTrue(result);

    }

    @Test
    void shouldDeleteExistingById() {
        AppUser appUser = new AppUser(
                0,
                "Jeb",
                "Smith",
                "jsmith85",
                "$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa",
                false,
                Collections.singletonList("PREMIUM"));
        repository.createAccount(appUser);

        boolean result = repository.deleteById(appUser.getAppUserId());
        assertTrue(result);
    }

    private AppUser makeAppUser() {
        AppUser appUser = new AppUser(
                4,
                "Julie",
                "Smith",
                "jsmith4",
                "$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa",
                false,
                Collections.singletonList("PREMIUM"));
        return appUser;
    }
}