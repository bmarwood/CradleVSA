package ca.cmpt373.earth.cradle.Models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vhts")
public class VHTs {

    @Id
    private String id; //primary key
    private String name;
    private String[] list_of_patients;
    private String[] list_of_assessments;

    public VHTs(String id, String name, String[] list_of_patients, String[] list_of_assessments) {
        this.id = id;
        this.name = name;
        this.list_of_patients = list_of_patients;
        this.list_of_assessments = list_of_assessments;
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

    public String[] getList_of_patients() {
        return list_of_patients;
    }

    public void setList_of_patients(String[] list_of_patients) {
        this.list_of_patients = list_of_patients;
    }

    public String[] getList_of_assessments() {
        return list_of_assessments;
    }

    public void setList_of_assessments(String[] list_of_assessments) {
        this.list_of_assessments = list_of_assessments;
    }
}

