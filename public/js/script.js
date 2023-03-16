var toggle = 1;
var count = 1;
console.log(toggle);

var toggle_minus = 6;
var div_auth = document.getElementById("auth");
var div_code = document.getElementById("verify_code");
var div_psw = document.getElementById("psw");
var page_count = document.getElementById("counter");
var regex = new RegExp(/^[0-9]+$/);
var regex_psw = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/); //Minimum eight characters, at least one letter, one number and one special character

  function change_tab() {
      
      
      switch(toggle){
          
          case 1 :  
          
              div_auth.classList.remove("active");
              div_code.classList.remove("in_active");
              div_code.classList.add("active");
              div_auth.classList.add("in_active");
              break;

          case 2 :  
          count++;
          var input_code = document.getElementById("floatingCode").value;
          
          if(input_code != "")
          {
              if(regex.test(input_code))
              {
                  if(input_code.length == 5)
                  {
                      div_code.classList.remove("active");
                      div_psw.classList.remove("in_active");
                      div_psw.classList.add("active");
                      div_code.classList.add("in_active");
                  }
                 else{
                  document.getElementById('err_code').innerHTML = "Enter only five digit";
                   document.getElementById('err_code').style.color="red";
                   return
                 }    
              }
              else{
                  document.getElementById('err_code').innerHTML = "Please enter only number";
                   document.getElementById('err_code').style.color="red";
                   return;
              }
          }
          else{
              document.getElementById('err_code').innerHTML = "Please enter code";
              document.getElementById('err_code').style.color="red";
              return;
          }
          break;

          case 3 : 
          count++;
          var input_psw = document.getElementById("floatingPassword").value;
          var input_cpsw = document.getElementById("floatingCpassword").value;
          console.log(input_psw);
          console.log(input_psw);
          if(input_psw != "" && input_cpsw != "")
          {
             if(input_psw == input_cpsw)
             {
            
                  if(regex_psw.test(input_psw))
                  {
                      console.log("Success");
                  }
                  else{
                      document.getElementById('err_psw').innerHTML = "Password containe minimum eight characters, at least one letter, one number and one special character";
                      document.getElementById('err_psw').style.color="red";
                      return
                  }
             }
             else{
              document.getElementById('err_psw').innerHTML = "Enter password is miss matched";
              document.getElementById('err_psw').style.color="red";
              return;
             }
          }
          else{
              document.getElementById('err_psw').innerHTML = "Please fill password";
              document.getElementById('err_psw').style.color="red";
              return
          }
          break;
          default : 
          alert("No Further steps");
          
      }  
      if(toggle == 3)
      {
        toggle = 3
      }
      else{
        toggle++;
      }
      page_count.innerHTML = toggle;


      console.log(toggle);
  }