package ca.cmpt373.earth.cradle.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "medications")
public class Medications {

    @Id
    private String id; //primary key
    private String patient_id;
    private String medication_name;
    private String dose;
    private String start_date;
    private String end_date;
    private String side_effects;
    private String frequency;

    public Medications(String id, String patient_id, String medication_name, String dose, String start_date, String end_date,
            String side_effects, String frequency) {
        this.id = id;
        this.patient_id = patient_id;
        this.medication_name = medication_name;
        this.dose = dose;
        this.start_date = start_date;
        this.end_date = end_date;
        this.side_effects = side_effects;
        this.frequency = frequency;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPatient_Id() {
        return patient_id;
    }

    public void setPatient_Id(String patient_id) {
        this.patient_id = patient_id;
    }

    public String getMedication_name() {
        return medication_name;
    }

    public void setMedication_name(String medication_name) {
        this.medication_name = medication_name;
    }

    public String getDose() {
        return dose;
    }

    public void setDose(String dose) {
        this.dose = dose;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public String getSide_effects() {
        return side_effects;
    }

    public void setSide_effects(String side_effects) {
        this.side_effects = side_effects;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }
}