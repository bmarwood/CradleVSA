package ca.cmpt373.earth.cradle.repository;

import ca.cmpt373.earth.cradle.Models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepository extends MongoRepository<Role, String> {

    Role findByRole(String role);
}
