package ca.cmpt373.earth.cradle.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "assessments")
public class Assessments {

    public enum Color {
        RED,
        YELLOW,
        GREEN
    }

    public enum Arrow {
        EMPTY,
        UP,
        DOWN
    }

    public enum Gestational_unit {
        WEEK,
        MONTH,
        NOT_PREGNANT,
        EMPTY
    }

//    public enum Gender {
//        MALE,
//        FEMALE
//    }


    @Id
    private String id;
    private String patient_id;
    private String name;
    private String birth_date;
    private String vht_id;
    private String date;
    private String gestational_age;
    private int heart_rate;
    private int systolic;
    private int diastolic;
    private Color ews_color;
    private String[] symptoms;
    private boolean referred;
    private boolean follow_up;
    private String follow_up_date;
    private boolean recheck;
    private Arrow arrow;
    private Gestational_unit gestational_unit;
    private String location;
    private String gender;


    public Assessments(String id, String patient_id, String birth_date, String vht_id, String date, String gestational_age, int heart_rate,
                       int systolic, int diastolic, Color ews_color, String[] symptoms, boolean referred, boolean follow_up, String follow_up_date,
                       boolean recheck, Arrow arrow, Gestational_unit gestational_unit, String name, String location, String gender) {
        this.id = id; //assestment ID
        this.patient_id = patient_id;
        this.birth_date = birth_date;
        //this.time_scale = time_scale;
        this.vht_id = vht_id;
        this.date = date;
        this.gestational_age = gestational_age;
        this.heart_rate = heart_rate;
        this.systolic = systolic;
        this.diastolic = diastolic;
        this.ews_color = ews_color;
        this.symptoms = symptoms;
        this.referred = referred;
        this.follow_up = follow_up;
        this.follow_up_date = follow_up_date;
        this.recheck = recheck;
        this.arrow = arrow;
        this.gestational_unit = gestational_unit;
        this.name = name;
        this.location = location;
        this.gender = gender;
    }


    public String get_id() {
        return id;
    }

    public void set_id(String _id) {
        this.id = id;
    }

    public String getPatient_id() {
        return patient_id;
    }

    public void setPatient_id(String patient_id) {
        this.patient_id = patient_id;
    }

    public String getName() {
        return this.name;
    }

    public String getBirth_date() {
        return birth_date;
    }

    public void setBirth_date(String birth_date) {
        this.birth_date = birth_date;
    }

    public String getVht_id() {
        return vht_id;
    }

    public void setVht_id(String vht_id) {
        this.vht_id = vht_id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getGestational_age() {
        return gestational_age;
    }

    public void setGestational_age(String gestational_age) {
        this.gestational_age = gestational_age;
    }

    public int getHeart_rate() {
        return heart_rate;
    }

    public void setHeart_rate(int heart_rate) {
        this.heart_rate = heart_rate;
    }

    public int getSystolic() {
        return systolic;
    }

    public void setSystolic(int systolic) {
        this.systolic = systolic;
    }

    public int getDiastolic() {
        return diastolic;
    }

    public void setDiastolic(int diastolic) {
        this.diastolic = diastolic;
    }

    public Color getEws_color() {
        return ews_color;
    }

    public void setEws_color(Color ews_color) {
        this.ews_color = ews_color;
    }

    public Arrow getArrow() {
        return arrow;
    }

    public void setarrow(Arrow arrow) {
        this.arrow = arrow;
    }

    public Gestational_unit getGestational_unit() {
        return gestational_unit;
    }

    public void setGestational_unit(Gestational_unit gestational_unit) {
        this.gestational_unit = gestational_unit;
    }

    public String[] getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String[] symptoms) {
        this.symptoms = symptoms;
    }

    public boolean isReferred() {
        return referred;
    }

    public void setReferred(boolean referred) {
        this.referred = referred;
    }

    public boolean isFollow_up() {
        return follow_up;
    }

    public void setFollow_up(boolean follow_up) {
        this.follow_up = follow_up;
    }

    public String getFollow_up_date() {
        return follow_up_date;
    }

    public void setFollow_up_date(String follow_up_date) {
        this.follow_up_date = follow_up_date;
    }

    public boolean isRecheck() {
        return recheck;
    }

    public void setRecheck(boolean recheck) {
        this.recheck = recheck;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}

