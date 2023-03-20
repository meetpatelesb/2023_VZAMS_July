var express = require("express");
var router = express.Router();
var nodeMailer = require("nodemailer"); 


router.post("/send",async (req,res) =>{
    const transporter = nodeMailer.createTransport({
        service:"gmail",
        host:"smpt.gmail.com",
        auth: {
        type:"OAuth2",
          user:"pnmrewada@gmail.com",
          clientId:'708172720191-d6kcstu306pih80bfigfvcojbog0ekvd.apps.googleusercontent.com',
          clientSecret:'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',
          refreshToken:'1//044okiJ4ST_jQCgYIARAAGAQSNwF-L9IrlxNxYOS_R1Ts4t6O6amXuwJHzBfiQoVr-KdqsZ_wLzpV1eQdABTw5X65pFgNsvkcxyU',
          accessToken:'ya29.a0AVvZVsobxBYunTQtk-Q0adbPaSVWGePQxaLdgaupNSyliOtJhWSRjjbvOfYs2mvknLeaV8pWNcQtGvAgThpdcz5NKrjXykOA0pmCy-C0wvQpFic-XAXPsSxkZ2NADjwUGJ4jILNS3P4c3ojNrRzgCQ0XD4wftBEaCgYKAbYSARASFQGbdwaItDY9T19CQpie_tteG1hawQ0166'
        },
        
    });
var code = parseInt(Math.random() * 98567);

transporter.sendMail({
    to:"pnmewada@gmail.com",
    from:"Team Twitter  <pnmrewada@gmail.com>",
    subject : "Twitter verification code",
    text:"code",
    html:` <div class="container" style="font-family: Helvetica,Arial,sans-serif;max-width:600px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:10px 25px;box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Twitter</a>
      </div>
      <p style="font-size:1.3em;font-weight: bold;">Verification Code</p>
      <p>Use the following OTP to complete your Sign Up procedures.</p>
      <h2 style="background: #00466a;margin: 20px auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${code}</h2>
      
      <hr style="border:none;border-top:1px solid #eee;margin: 20px auto"  />
      
    </div>

</div>`
    
});
res.json({code})
})

module.exports = router;