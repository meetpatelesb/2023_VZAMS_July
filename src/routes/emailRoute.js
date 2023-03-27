var express = require("express");
var router = express.Router();
var nodeMailer = require("nodemailer"); 


router.post("/send",async (req,res) =>{
  var email = req.body.email;
    const transporter = nodeMailer.createTransport({
        service:"gmail",
        host:"smpt.gmail.com",
        auth: {
        type:"OAuth2",
          user:"pnmrewada@gmail.com",
          clientId:'708172720191-d6kcstu306pih80bfigfvcojbog0ekvd.apps.googleusercontent.com',
          clientSecret:'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',
          refreshToken:'1//04V9dFKQnDsbSCgYIARAAGAQSNwF-L9IrJq_UASQsh3tijfEMEy3kWnP3rnOzZ0-cxUbUEJe-EbmN2G6oa-h0N3dVXrBKc8A8cY0',
          accessToken:'ya29.a0AVvZVso4yaOnxSQug6gJy5LxNCYuVw4Rm3VO5SKgvjoEoCe06ccqWwB4NQAKvDRwN2GBHhNNGhDDtJ5xZ7xdvK8e-zUM2CrkX1ffRgW7EeTAZ1h92-DVOOBTPmbC3lxBjE6UvSkDzC-7mYfgscAYQda9niaDaCgYKARwSARASFQGbdwaI1Cfj1ws_ixTf1bZrSxThgA0163'
        },
        
    });
var code =  Math.floor(Math.random() *90000);

transporter.sendMail({
    to:`${email}`,
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