package fiftygo.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.util.Assert;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class AppUser extends User {
    private static final String AUTHORITY_PREFIX = "ROLE_";

    private int id;

//    @NotBlank(message = "First name is required.")
//    private String firstName;
//
//    @NotBlank(message = "Last name is required.")
//    private String lastName;

    public AppUser(int id, String username, String password,
                   boolean disabled, List<String> roles) {
        super(username, password, !disabled,
                true, true, true,
                convertRolesToAuthorities(roles));
        this.id = id;
    }

    private List<String> roles = new ArrayList<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

//    public String getFirstName() {
//        return firstName;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }

    public static List<GrantedAuthority> convertRolesToAuthorities(List<String> roles) {
        List<GrantedAuthority> authorities = new ArrayList<>(roles.size());
        for (String role : roles) {
            Assert.isTrue(!role.startsWith(AUTHORITY_PREFIX),
                    () -> String.format("%s cannot start with %s (it is automatically added)",
                            role, AUTHORITY_PREFIX));
            authorities.add(new SimpleGrantedAuthority(AUTHORITY_PREFIX + role));
        }
        return authorities;
    }

    public static List<String> convertAuthoritiesToRoles(Collection<GrantedAuthority> authorities) {
        return authorities.stream()
                .map(a -> a.getAuthority().substring(AUTHORITY_PREFIX.length()))
                .collect(Collectors.toList());
    }

}
