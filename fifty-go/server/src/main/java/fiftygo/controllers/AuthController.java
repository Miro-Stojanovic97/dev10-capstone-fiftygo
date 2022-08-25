package fiftygo.controllers;

import fiftygo.domain.Result;
import fiftygo.models.AppUser;
import fiftygo.models.Credentials;
import fiftygo.security.AppUserService;
import fiftygo.security.JwtConverter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {
    // The `AuthenticationManager` interface defines a single method `authenticate()`
    // that processes an Authentication request.
    private final AuthenticationManager authenticationManager;
    private final JwtConverter jwtConverter;
    private final AppUserService appUserService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtConverter jwtConverter,
                          AppUserService appUserService) {

        this.authenticationManager = authenticationManager;
        this.jwtConverter = jwtConverter;
        this.appUserService = appUserService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Object> authenticate(@RequestBody Map<String, String> credentials) {

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(credentials.get("username"), credentials.get("password"));

        try {
            // The `Authentication` interface Represents the token for an authentication request
            // or for an authenticated principal once the request has been processed by the //
            // `AuthenticationManager.authenticate(Authentication)` method.
            Authentication authentication = authenticationManager.authenticate(authToken);

            if (authentication.isAuthenticated()) {
                HashMap<String, String> map = new HashMap<>();

                AppUser appUser = (AppUser)authentication.getPrincipal();
                String token = jwtConverter.getTokenFromUser(appUser);
                map.put("jwt_token", token);

                return new ResponseEntity<>(map, HttpStatus.OK); // 200
            }

        } catch (AuthenticationException ex) {
            System.out.println(ex);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN); // 403
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody String firstName, String lastName, String username, String password) {
        Result<AppUser> result = appUserService.create(firstName, lastName, username, password);
        if (result.isSuccess()) {
            HashMap<String, Integer> map = new HashMap<>();
            map.put("id", result.getPayload().getAppUserId());
            return new ResponseEntity<>(map, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST);
    }
//    @PostMapping("/refresh_token")
//    public ResponseEntity<Map<String, String>> refreshToken(UsernamePasswordAuthenticationToken principal) {
//        AppUser appUser = new AppUser(principal.get, principal.getName(), principal.getName(), principal.getAuthorities());
//        String jwtToken = jwtConverter.getTokenFromUser(appUser);
//
//        HashMap<String, String> map = new HashMap<>();
//        map.put("jwt_token", jwtToken);
//
//        return new ResponseEntity<>(map, HttpStatus.OK);
//    }
}
