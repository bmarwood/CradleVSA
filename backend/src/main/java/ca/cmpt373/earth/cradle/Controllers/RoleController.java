package ca.cmpt373.earth.cradle.Controllers;

import ca.cmpt373.earth.cradle.Models.Role;
import ca.cmpt373.earth.cradle.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/all")
    public List listAllRoles() {
        return this.roleRepository.findAll();
    }

    //Update
    @PutMapping("/put{roleId}")
    public Role updateRole(@RequestBody Role role, @PathVariable String roleId) {
        role.setId(roleId);
        roleRepository.save(role);
        return role;
    }

    @PostMapping
    public Role createRole(@RequestBody Role role) {
        roleRepository.save(role);
        return role;
    }

    @DeleteMapping("/del{roleId}")
    public String deleteById(@PathVariable String id) {
        roleRepository.deleteById(id);
        return id;
    }

    @GetMapping("/get{roleId}")
    public List findRoleById(@PathVariable String id) {
        return roleRepository.findRoleByUserID(id);
    }
}
