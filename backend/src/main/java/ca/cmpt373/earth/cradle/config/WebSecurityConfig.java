package ca.cmpt373.earth.cradle.config;

import ca.cmpt373.earth.cradle.services.MongoUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfigurationSource;


//The class override methods from WebSecurityConfigurerAdapter to
//enforce security rules.
@Configuration          //indicates the class will contains java "beans"
@EnableWebSecurity
@EnableConfigurationProperties
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    MongoUserDetailsService userDetailsService;

    @Autowired
    AuthenticationHandler authenticationHandler;

    //Tell Spring to use our own PasswordEncoder for
    //encoding and decoding password
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    };

    @Bean
    public UserDetailsService mongoUserDetails() {
        return new MongoUserDetailsService();
    }

    //This method tells SpringBoot to use MongoUserDetailsServices for authentication
    //It overrides the default AuthenticationManagerBuilder config
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(mongoUserDetails()).passwordEncoder(passwordEncoder());
    }

    //This method tells SpringBoot to use our own config instead of Springs default config
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/login").permitAll()
                .antMatchers( "/admin-dashboard").hasAnyAuthority("ADMIN")
                .antMatchers( "/user-dashboard").hasAnyAuthority("USER")
                .and()
                .formLogin()
                .loginProcessingUrl("/login")
                .successHandler(authenticationHandler)
                .and()
                .httpBasic()
                /*.and()
                .logout().permitAll().logoutSuccessUrl("/login")*/
                .and()
                .sessionManagement().disable() //Tells Spring not hold session information for users
                .csrf().disable();
    }
}

