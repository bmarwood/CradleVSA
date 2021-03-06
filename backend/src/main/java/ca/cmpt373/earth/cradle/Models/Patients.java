package ca.cmpt373.earth.cradle.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "patients")
public class Patients {

    @Id
    private String id; //primary key
    private String name;
    private String birth_date;
    private List<Assessments> list_of_assessments;
    private String gender;
    private String vht_id;


    public Patients(String id, String name, String birth_date, List<Assessments> list_of_assessments, String gender, String vht_id) {
        this.id = id;
        this.name = name;
        this.birth_date = birth_date;
        this.list_of_assessments = list_of_assessments;
        this.gender = gender;
        this.vht_id = vht_id;
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

    public List<Assessments> getList_of_assessments() {
        return list_of_assessments;
    }

    public void setList_of_assessments(List<Assessments> list_of_assessments) {
        this.list_of_assessments = list_of_assessments;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getVht_id() {
        return vht_id;
    }

    public void setVht_id(String vht_id) {
        this.vht_id = vht_id;
    }


}

