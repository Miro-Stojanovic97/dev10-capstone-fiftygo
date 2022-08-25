package fiftygo.security;

import fiftygo.models.AppUser;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtConverter {

    // Signing key
    private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    // "Configurable" constants
    private final String ISSUER = "fiftygo";
    private final int EXPIRATION_MINUTES = 60;
    private final int EXPIRATION_MILLIS = EXPIRATION_MINUTES * 60 * 1000;

    public String getTokenFromUser(AppUser appUser) {

        String authorities = appUser.getAuthorities().stream()
                .map(i -> i.getAuthority())
                .collect(Collectors.joining(","));

        // Use JJWT classes to build a token.
        return Jwts.builder()
                .setIssuer(ISSUER)
                .setSubject(appUser.getUsername())
                .claim("authorities", authorities)
                .claim("appUserId", appUser.getAppUserId())
                .claim("firstName", appUser.getFirstName())
                .claim("lastName", appUser.getLastName())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MILLIS))
                .signWith(key)
                .compact();
    }

    public AppUser getUserFromToken(String token) {

        if (token == null || !token.startsWith("Bearer ")) {
            return null;
        }

        try {
            // Use JJWT classes to read a token.
            Jws<Claims> jws = Jwts.parserBuilder()
                    .requireIssuer(ISSUER)
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.substring(7));


            String username = jws.getBody().getSubject();
            String authStr = (String) jws.getBody().get("authorities");
            List<String> authorities = List.of(authStr.split(","));

            int appUserId = (int) jws.getBody().get("appUserId");
            String firstName = (String) jws.getBody().get("firstName");
            String lastName = (String) jws.getBody().get("lastName");

            return new AppUser(appUserId, firstName, lastName, username, username, false, authorities);

        } catch (JwtException e) {
            // JWT failures are modeled as exceptions.
            System.out.println(e);
        }

        return null;
    }
}
