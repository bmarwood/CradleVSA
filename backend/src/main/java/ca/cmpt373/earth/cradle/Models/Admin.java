package ca.cmpt373.earth.cradle.Models;

import java.util.Set;

public class Admin {
    private String id;
    private Set<Users> users; //Hold lists of all available users

    public Admin(String id){
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<Users> getUsers() {
        return users;
    }

    public void setUsers(Set<Users> users) {
        this.users = users;
    }

    public void addUsers(Users user){
        this.users.add(user);
    }
}
