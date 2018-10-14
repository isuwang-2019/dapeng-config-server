package com.github.dapeng.config;

import com.github.dapeng.web.system.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


/**
 * @author with struy.
 * Create by 2018/6/8 00:27
 * email :yq1724555319@gmail.com
 * 启用WebSecurity
 */
@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.headers().frameOptions().disable();
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/config/**").hasAnyRole("ADMIN", "OPS")
                .antMatchers("/monitor/**").hasAnyRole("ADMIN")
                .antMatchers("/deploy/**").hasAnyRole("ADMIN", "OPS")
                .antMatchers("/clusters/**").hasAnyRole("ADMIN", "OPS")
                .antMatchers("/system/**").hasAnyRole("ADMIN")
                .antMatchers("/me/**").hasAnyRole("ADMIN", "OPS", "DEV")
                .antMatchers("/build/** ").hasAnyRole("ADMIN", "OPS", "DEV")
                .antMatchers("/api/**").hasAnyRole("ADMIN", "OPS", "DEV")
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
                .logout()
                .permitAll();
    }


    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(new Md5PasswordEncoder());
    }


    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/resources/**", "/plugins/**", "/css/**", "/js/**", "/images/**");
    }

}
