package fiftygo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConverter jwtConverter;

    public SecurityConfig(JwtConverter jwtConverter) {
        this.jwtConverter = jwtConverter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.cors();

        http.authorizeRequests()
                .antMatchers("/authenticate", "/create_account").permitAll()
                .antMatchers(HttpMethod.POST, "/refresh-token").authenticated()

                .antMatchers(HttpMethod.GET, "/fiftygo/pin", "/fiftygo/pin/*").hasAnyRole("USER", "PREMIUM", "ADMIN")
                .antMatchers(HttpMethod.POST, "/fiftygo/pin").hasAnyRole("USER", "PREMIUM", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/fiftygo/pin/*").hasAnyRole("USER", "PREMIUM", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/fiftygo/pin/*").hasAnyRole("USER", "PREMIUM", "ADMIN")

                .antMatchers(HttpMethod.GET, "/fiftygo/trip", "/fiftygo/trip/*").hasAnyRole("USER", "PREMIUM", "ADMIN")
                .antMatchers(HttpMethod.POST, "/fiftygo/trip").hasAnyRole("USER", "PREMIUM", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/fiftygo/trip/*").hasAnyRole("USER", "PREMIUM", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/fiftygo/trip/*").hasAnyRole("USER", "PREMIUM", "ADMIN")

                .antMatchers(HttpMethod.GET, "/fiftygo/type", "/fiftygo/type/*").hasAnyRole("USER", "PREMIUM", "ADMIN")
                .antMatchers(HttpMethod.POST, "/fiftygo/type").hasAnyRole("USER", "PREMIUM", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/fiftygo/type/*").hasAnyRole("USER", "PREMIUM", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/fiftygo/type/*").hasAnyRole("ADMIN")

                .antMatchers(HttpMethod.GET, "/fiftygo/city", "/fiftygo/city/*").hasAnyRole("USER", "PREMIUM", "ADMIN")
                .antMatchers(HttpMethod.POST, "/fiftygo/city").hasAnyRole("USER", "PREMIUM", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/fiftygo/city/*").hasAnyRole("USER", "PREMIUM", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/fiftygo/city/*").hasAnyRole("ADMIN")

                .antMatchers("/**").denyAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), jwtConverter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
}
