package ca.cmpt373.earth.cradle;
import ca.cmpt373.earth.cradle.repository.AssessmentsRepository;
import ca.cmpt373.earth.cradle.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class CradleApplication {

	@Autowired
	UsersRepository usersRepository;
	UsersRepository repository;
	@Autowired
	AssessmentsRepository assessmentsRepository;

	public static void main(String[] args) {
		SpringApplication.run(CradleApplication.class, args);
	}

	/*public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/users/login").allowedOrigins("http://localhost:8080/users/login");
			}
		};
	}*/

}


