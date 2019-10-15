package ca.cmpt373.earth.cradle.Controllers;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.twilio.twiml.messaging.Body;
import com.twilio.twiml.messaging.Message;
import com.twilio.twiml.MessagingResponse;
import com.twilio.twiml.TwiMLException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

//Controller for  Twilio Webhook when Sms comes in
@Controller
public class SmsWebhookController {

    // Find your Account Sid and Auth Token at twilio.com/console
    private static final String ACCOUNT_SID =
            "AC752b0767fe6060eff8325f8aaf4b533b";
    private static final String AUTH_TOKEN =
            "e84609dc660df4ac695d3f4727c5f853";

    @GetMapping("/sms")
    @ResponseBody
    public String respondToSms(){

        return "Your Message has been received.";
    }
}
