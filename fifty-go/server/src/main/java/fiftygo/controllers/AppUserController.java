package fiftygo.controllers;

import fiftygo.domain.Result;
import fiftygo.domain.ResultType;
import fiftygo.models.AppUser;
import fiftygo.security.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class AppUserController {

    private final AppUserService service;

    public AppUserController(AppUserService service) {
        this.service = service;
    }

    @GetMapping("/user")
    public List<AppUser> findAllUsers() {
        return service.findAll();
    }

    @PostMapping("/create_account")
    public ResponseEntity<Object> createAccount(@RequestBody Map<String, String> userData) {
        Result<AppUser> result = service.createAccount(userData.get("firstName"), userData.get("lastName"), userData.get("username"), userData.get("password"));
        if (result.isSuccess()) {
            HashMap<String, Integer> map = new HashMap<>();
            map.put("id", result.getPayload().getAppUserId());
            return new ResponseEntity<>(map, HttpStatus.CREATED); // 201
        }
        return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST); // 400
    }

    @PutMapping("/user/{appUserId}")
    public ResponseEntity<Object> update(@PathVariable int appUserId, @RequestBody Map<String, String> userData) {
        int pathAppUserId = appUserId;
        int bodyAppUserId = Integer.parseInt(userData.get("appUserId"));

        Result<AppUser> result = new Result<>();

        if (pathAppUserId != bodyAppUserId) {
            result.addErrorMessage("Cannot update due to userId mismatch.", ResultType.INVALID);
            return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.CONFLICT);
        }

        result = service.update(appUserId, userData.get("firstName"), userData.get("lastName"), userData.get("username"), userData.get("password"));
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.OK); // 200
        }
        return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST); // 400
    }
}
