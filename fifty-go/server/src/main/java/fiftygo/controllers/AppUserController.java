package fiftygo.controllers;

import fiftygo.domain.Result;
import fiftygo.models.AppUser;
import fiftygo.security.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController()
public class AppUserController {

    private final AppUserService service;

    public AppUserController(AppUserService service) {
        this.service = service;
    }

    @PostMapping("/create_account")
    public ResponseEntity<Object> createAccount(@RequestBody Map<String, String> userData) {
        Result<AppUser> result = service.createAccount(userData.get("firstName"), userData.get("lastName"), userData.get("username"), userData.get("password"));
        if (result.isSuccess()) {
            HashMap<String, Integer> map = new HashMap<>();
            map.put("id", result.getPayload().getAppUserId());
            return new ResponseEntity<>(map, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST);
    }
}
