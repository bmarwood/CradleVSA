package ca.cmpt373.earth.cradle.Controllers;

import ca.cmpt373.earth.cradle.Models.Assessments;
import ca.cmpt373.earth.cradle.repository.AssessmentsRepository;
import com.twilio.twiml.messaging.Body;
import com.twilio.twiml.messaging.Message;
import com.twilio.twiml.MessagingResponse;
import com.twilio.twiml.TwiMLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SmsWebhookController { //Controller for  Twilio Webhook when Sms comes in

    @Autowired
    private AssessmentsRepository assessmentsRepository;

    @Autowired
    private AssessmentsController assessmentController;


    public SmsWebhookController(AssessmentsRepository assessmentsRepository) {
        this.assessmentsRepository = assessmentsRepository;
    }

    // Account Sid and Auth Token at twilio.com/console
    private static final String ACCOUNT_SID =
            "AC752b0767fe6060eff8325f8aaf4b533b";
    private static final String AUTH_TOKEN =
            "e84609dc660df4ac695d3f4727c5f853";

    @GetMapping(path = "/sms", produces = "application/xml")
    @ResponseBody
    public String respondToSms(@RequestParam(value = "Body") String smsBody) {
        Body body;
        String introMessage = "New referral";
        String[] assessmentParams = smsBody.split("; ");
        final int correctParamsLength = 19;

        if (assessmentParams[0].equals(introMessage) && (assessmentParams.length == correctParamsLength)) {
            Assessments candidate = StringToAssessment(assessmentParams);
            assessmentController.add(candidate);
            /////
            // assessmentsRepository.save(candidate);
            body = new Body
                    .Builder("Reading successfully received!")
                    .build();
        } else {
            body = new Body
                    .Builder("Reading failed to be received. Please send reading again.")
                    .build();
        }
        Message sms = new Message
                .Builder()
                .body(body)
                .build();
        MessagingResponse twiml = new MessagingResponse
                .Builder()
                .message(sms)
                .build();
        return twiml.toXml();
    }

    private Assessments StringToAssessment(String[] assessmentParams) {

        //Parsing SMS String body into an Assessment object
        String id = assessmentParams[1];
        String patient_id = assessmentParams[2];
        String birth_date = assessmentParams[3];
        String vht_id = assessmentParams[4];
        String date = assessmentParams[5];
        String gestational_age = assessmentParams[6];
        String location = "EMPTY";
        String gender = "MALE";
        int heart_rate = Integer.parseInt(assessmentParams[7]);
        int systolic = Integer.parseInt(assessmentParams[8]);
        int diastolic = Integer.parseInt(assessmentParams[9]);
        Assessments.Color ews_color = Assessments.Color.YELLOW;
        if (assessmentParams[10].equals("RED")) {
            ews_color = Assessments.Color.RED;
        } else if (assessmentParams[10].equals("GREEN")) {
            ews_color = Assessments.Color.GREEN;
        }
        String[] symptoms = assessmentParams[11].split(", ");
        boolean referred = false;
        if (assessmentParams[12].equals("true")) referred = true;
        boolean follow_up = false;
        if (assessmentParams[13].equals("true")) follow_up = true;
        String follow_up_date = assessmentParams[14];
        boolean recheck = false;
        if (assessmentParams[15].equals("true")) recheck = true;
        Assessments.Arrow arrow = Assessments.Arrow.EMPTY;
        if (assessmentParams[16].equals("UP")) {
            arrow = Assessments.Arrow.UP;
        } else if (assessmentParams[16].equals("DOWN")) {
            arrow = Assessments.Arrow.DOWN;
        }
        Assessments.Gestational_unit Gestational_unit = Assessments.Gestational_unit.NOT_PREGNANT;
        if (assessmentParams[17].equals("WEEK")) {
            Gestational_unit = Assessments.Gestational_unit.WEEK;
        } else if (assessmentParams[17].equals("MONTH")) {
            Gestational_unit = Assessments.Gestational_unit.MONTH;
        }
        String name = assessmentParams[18];
        Assessments assessment =
                new Assessments(id, patient_id, birth_date, vht_id, date, gestational_age,
                        heart_rate, systolic, diastolic, ews_color, symptoms,
                        referred, follow_up, follow_up_date, recheck,
                        arrow, Gestational_unit, name, location, gender);
        return assessment;
    }
}
