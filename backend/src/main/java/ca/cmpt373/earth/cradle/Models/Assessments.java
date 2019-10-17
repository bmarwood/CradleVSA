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


    @Id
    private String id;
    private String patient_id;
    private String patient_age;
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


    public Assessments(String id, String patient_id, String patient_age, String vht_id, String date, String gestational_age, int heart_rate,
                       int systolic, int diastolic, Color ews_color, String[] symptoms, boolean referred, boolean follow_up, String follow_up_date, boolean recheck, Arrow arrow) {
        this.id = id; //assestment ID
        this.patient_id = patient_id;
        this.patient_age = patient_age;
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

    public String getPatient_age() {
        return patient_age;
    }

    public void setPatient_age(String patient_age) {
        this.patient_age = patient_age;
    }

//    public String getTime_scale() {
//        return time_scale;
//    }
//
//    public void setTime_scale(String time_scale) {
//        this.time_scale = time_scale;
//    }

    public String getVht_id() {
        return vht_id;
    }

    public void setVht_id(String vht_id) {
        this.vht_id = vht_id;
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

    //Arrow getter and setter

    public void setEws_color(Color ews_color) {
        this.ews_color = ews_color;
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
}

