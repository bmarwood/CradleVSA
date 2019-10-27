package ca.cmpt373.earth.cradle.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document(collection = "users")
public class Users {

    public enum Gender {
        MALE,
        FEMALE
    }

    //Basic user's info
    @Id
    private String id;          //primary key
    private String username;    //primary key
    private String password;
    private String name;        //primary key - there is an error if the name is taken
    private String dob;
    private String address;
    private String gender;
    //    private Gender gender;
    private Set<Role> roles;
    private boolean enabled;

    public Users() {
        this.id = "n/a";
        this.username = "n/a";
        this.password = "n/a";
        this.name = "n/a";
        this.dob = "n/a";
        this.address = "n/a";
        this.gender = null;
        this.enabled = false;
    }

    public Users(String id, String username, String password,
                 String name, String dob, String address,
                 String gender, Set<Role> roles) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.dob = dob;
        this.address = address;
        this.gender = gender;
        this.enabled = false;
        this.roles = roles;
    }

    public String getId() {
        return id;
    }

    public String getDob() {
        return dob;
    }

    public String getAddress() {
        return address;
    }

    public String getGender() {
        return gender;
    }

//    public Gender getGender() {
//        return gender;
//    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled() {
        enabled = true;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

//    public void setGender(Gender gender) {
//        this.gender = gender;
//    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void addRoles(Role role) {
        this.roles.add(role);
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}

