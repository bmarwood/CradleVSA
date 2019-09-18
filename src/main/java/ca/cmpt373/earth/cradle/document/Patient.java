package ca.cmpt373.earth.cradle.document;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "Patients")
public class Patient {
    String id;
    String villageNumber;
    String initials;
    String dob;
    int age;
    String gender;
    boolean pregnant;
    int gestationalAge; //need to handle if months/weeks
    String medicalHistory;
    String drugHistory;
    ArrayList<String> systoms;
    ArrayList<String> pReadings;
    ArrayList<VHT> assignedVHT;

    //Health Workers
    ArrayList<String> diagnosis;
    ArrayList<String> treatment;
    String followUp;

    public Patient(String id, String villageNumber, String initials, String dob, int age, String gender, boolean pregnant, int gestationalAge, String medicalHistory, String drugHistory) {
        this.id = id;
        this.villageNumber = villageNumber;
        this.initials = initials;
        this.dob = dob;
        this.age = age;
        this.gender = gender;
        this.pregnant = pregnant;
        this.gestationalAge = gestationalAge;
        this.medicalHistory = medicalHistory;
        this.drugHistory = drugHistory;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getVillageNumber() {
        return villageNumber;
    }

    public void setVillageNumber(String villageNumber) {
        this.villageNumber = villageNumber;
    }

    public String getInitials() {
        return initials;
    }

    public void setInitials(String initials) {
        this.initials = initials;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public boolean isPregnant() {
        return pregnant;
    }

    public void setPregnant(boolean pregnant) {
        this.pregnant = pregnant;
    }

    public int getGestationalAge() {
        return gestationalAge;
    }

    public void setGestationalAge(int gestationalAge) {
        this.gestationalAge = gestationalAge;
    }

    public String getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }

    public String getDrugHistory() {
        return drugHistory;
    }

    public void setDrugHistory(String drugHistory) {
        this.drugHistory = drugHistory;
    }

    public ArrayList<String> getSystoms() {
        return systoms;
    }

    public void setSystoms(ArrayList<String> systoms) {
        this.systoms = systoms;
    }

    public ArrayList<String> getpReadings() {
        return pReadings;
    }

    public void setpReadings(ArrayList<String> pReadings) {
        this.pReadings = pReadings;
    }

    public ArrayList<VHT> getAssignedVHT() {
        return assignedVHT;
    }

    public void setAssignedVHT(ArrayList<VHT> assignedVHT) {
        this.assignedVHT = assignedVHT;
    }

    public ArrayList<String> getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(ArrayList<String> diagnosis) {
        this.diagnosis = diagnosis;
    }

    public ArrayList<String> getTreatment() {
        return treatment;
    }

    public void setTreatment(ArrayList<String> treatment) {
        this.treatment = treatment;
    }

    public String getFollowUp() {
        return followUp;
    }

    public void setFollowUp(String followUp) {
        this.followUp = followUp;
    }
}
