package ca.cmpt373.earth.cradle;
import ca.cmpt373.earth.cradle.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CradleApplication {

	@Autowired
	UsersRepository usersRepository;

	public static void main(String[] args) {
		SpringApplication.run(CradleApplication.class, args);
	}

}


