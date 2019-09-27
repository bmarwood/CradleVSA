package ca.cmpt373.earth.cradle.Models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "patients")
public class Patients {

    @Id
    private String id; //primary key
    private String name;
    private String birth_date;
    private String list_of_assessments;
    private String gender;


    public Patients(String id, String name, String birth_date, String list_of_assessments, String gender) {
        this.id = id;
        this.name = name;
        this.birth_date = birth_date;
        this.list_of_assessments = list_of_assessments;
        this.gender = gender;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBirth_date() {
        return birth_date;
    }

    public void setBirth_date(String birth_date) {
        this.birth_date = birth_date;
    }

    public String getList_of_assessments() {
        return list_of_assessments;
    }

    public void setList_of_assessments(String list_of_assessments) {
        this.list_of_assessments = list_of_assessments;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}

