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


    public SmsWebhookController(AssessmentsRepository assessmentsRepository) {
        this.assessmentsRepository = assessmentsRepository;
    }

    // Account Sid and Auth Token at twilio.com/console
    private static final String ACCOUNT_SID =
            "AC752b0767fe6060eff8325f8aaf4b533b";
    private static final String AUTH_TOKEN =
            "e84609dc660df4ac695d3f4727c5f853";

    @GetMapping(path="/sms", produces="application/xml")
    @ResponseBody
    public String respondToSms(@RequestParam(value = "Body") String smsBody){
        Body body;
        String introMessage = "New referral";
        String[] assessmentParams = smsBody.split(", ");
        int correctParamsLength = 17;
        if (assessmentParams[0].equals(introMessage) && (assessmentParams.length == correctParamsLength)){
        Assessments candidate = StringToAssessment(assessmentParams);
            assessmentsRepository.save(candidate);
            body = new Body
                    .Builder("Reading successfully received!")
                    .build();
        }
        else {
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

    private Assessments StringToAssessment(String[] assessmentParams){

        //Parsing SMS String body into an Assessment object
        String id = assessmentParams[1];
        String patient_id = assessmentParams[2];
        String patient_age = assessmentParams[3];
        String vht_id = assessmentParams[4];
        String date = assessmentParams[5] + assessmentParams[6];
        String gestational_age = assessmentParams[7];
        int heart_rate = Integer.parseInt(assessmentParams[8]);
        int systolic = Integer.parseInt(assessmentParams[9]);
        int diastolic = Integer.parseInt(assessmentParams[10]);
        //TO-DO: ews_color
        Assessments.Color ews_color = Assessments.Color.YELLOW;
        //
        String[] symptoms = assessmentParams[12].split(" ");
        boolean referred = false;
        if (assessmentParams[12].equals("true")) referred = true;
        if (assessmentParams[12].equals("false")) referred = false;
        boolean follow_up = false;
        if (assessmentParams[13].equals("true")) follow_up = true;
        if (assessmentParams[13].equals("false")) follow_up = false;
        String follow_up_date = assessmentParams[14];
        boolean recheck = false;
        if (assessmentParams[15].equals("true")) recheck = true;
        if (assessmentParams[15].equals("false")) recheck = false;
        //TO-DO: Arrow
        Assessments.Arrow arrow = Assessments.Arrow.EMPTY;
        //

        Assessments assessment =
                new Assessments(id, patient_id, patient_age, vht_id, date, gestational_age, heart_rate, systolic, diastolic, ews_color, symptoms, referred, follow_up, follow_up_date, recheck, arrow);

        return assessment;
    }
}
