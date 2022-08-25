package fiftygo.security;

import fiftygo.App;
import fiftygo.data.AppUserRepository;
import fiftygo.domain.Result;
import fiftygo.domain.ResultType;
import fiftygo.models.AppUser;
import fiftygo.models.Credentials;
import fiftygo.models.Pin;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.*;
import java.util.List;
import java.util.Set;

@Service
public class AppUserService implements UserDetailsService {

    private final AppUserRepository repository;
    private final PasswordEncoder encoder;

    public AppUserService(AppUserRepository repository,
                          PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = repository.findByUsername(username);

        if (appUser == null || !appUser.isEnabled()) {
            throw new UsernameNotFoundException(username + " not found");
        }

        return appUser;
    }

    public Result<AppUser> createAccount(String firstName, String lastName, String username, String password) {

        Result<AppUser> result = new Result<>();

        validate(username);
        validatePassword(password);

        password = encoder.encode(password);

        AppUser appUser = new AppUser(0, firstName, lastName, username, password, false, List.of("USER"));

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        if (!violations.isEmpty()) {
            for (ConstraintViolation<AppUser> violation : violations) {
                result.addErrorMessage(violation.getMessage(), ResultType.INVALID);
            }
            return result;
        }

        result.setPayload(repository.createAccount(appUser));
        return result;
    }

    public Result<AppUser> update(int appUserId, String firstName, String lastName, String username, String password) {
        Result<AppUser> result = new Result<>();

        validate(username);
        validatePassword(password);

        password = encoder.encode(password);

        AppUser appUser = new AppUser(appUserId, firstName, lastName, username, password, false, List.of("USER"));

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<AppUser>> violations = validator.validate(appUser);

        if (!violations.isEmpty()) {
            for (ConstraintViolation<AppUser> violation : violations) {
                result.addErrorMessage(violation.getMessage(), ResultType.INVALID);
            }
            return result;
        }

        boolean updated = repository.update(appUser);
        if (!updated) {
            result.addErrorMessage("User update failed :(", ResultType.INVALID);
        }
        return result;
    }

    public boolean deleteById(int appUserId) {
        return repository.deleteById(appUserId);
    }

    private Result<AppUser> validate(String username) {
        Result<AppUser> result = new Result<>();
        if (username == null || username.isBlank()) {
            result.addErrorMessage("username is required",
                    ResultType.INVALID);
            return result;
        }

        if (username.length() > 50) {
            result.addErrorMessage("username must be less than 50 characters",
                    ResultType.INVALID);
        }
        return result;
    }

    private Result<AppUser> validatePassword(String password) {
        Result<AppUser> result = new Result<>();

        if (password == null || password.length() < 8) {
            result.addErrorMessage("password must be at least 8 characters",
                    ResultType.INVALID);
            return result;
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        if (digits == 0 || letters == 0 || others == 0) {
            result.addErrorMessage("password must contain a digit, a letter, and a non-digit/non-letter",
                    ResultType.INVALID);
        }

        return result;
    }
}
