var express = require("express");
var router = express.Router();
var nodeMailer = require("nodemailer"); 


app.post("/send",async (req,res) =>{
    const transporter = nodeMailer.createTransport({
        service:"gmail",
        host:"smpt.gmail.com",
        auth: {
        type:"OAuth2",
          user:"pnmewada@gmail.com",
          clientId:'708172720191-d6kcstu306pih80bfigfvcojbog0ekvd.apps.googleusercontent.com',
          clientSecret:'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',
          refreshToken:'1//04rgrk5lQSzG1CgYIARAAGAQSNwF-L9IrUoCxQ3WgJKzalIwaASdXB2-9YbEgd68QRiNqwByaUgFVHU7TAGvm6Boi-ECXAmY4xZE',
          accessToken:'ya29.a0AVvZVspXOHEJ9ju-pC9iv9nPzAeX75dIFuSglu_uEtdb1l3YvC5E1Iv-cS2hUzR0LXYy47GncMqj-Epq1CTyf21hBlNoRtxP7Rv5Bb2mFZGa9WiM6G8viV3I-7JSAMsMsqeCGtPT_wB5Syi8jrMlsd3kWZlOaCgYKAYsSARASFQGbdwaIEMcN5O-8Xf2z9u-0wqxGXg0163'
        },
        
    });
var code = parseInt(Math.random() * 93932);
transporter.sendMail({
    to:"pnmewada@gmail.com",
    from:"'siddharth pandya'   <pnmrewada@gmail.com>",
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

module.export = router;