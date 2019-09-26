package ca.cmpt373.earth.cradle.Models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class Users {

    @Id
    private String id; //primary key
    private String name;
    private String teamName;
    private Double salary;
    private String username;
    private String password;

    public Users (String id, String name, Double salary, String username, String password) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.username = username;
        this.password = password;
    }

//    public Users (String id, String name, Double salary) {
//        this.id = id;
//        this.name = name;
//        this.salary = salary;
//        this.username = "username";
//        this.password = "password";
//    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setUsername(String username) { this.username = username; }

    public void setPassword(String password) { this.password = password; }

    public String getUsername() { return username; }

    public String getPassword() { return password; }

    public String getTeamName() {
        return teamName;
    }

    public Double getSalary() {
        return salary;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }
}

