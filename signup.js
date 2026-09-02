var field=["email","password"];
var btn_su=["sign-up","success"];
var h1="signUP";
var msg01="to signIN in our platform read our terms to use it ";
var msg02="fill out fields above";
var glyphicon=
[
  ["signup.php","user","sign-up"],
];

function CreatinInputSignupMenu()
{  

  SignupBase();
 

  for(var i=0;i<field.length;i++)
  {
    document.write("<label for='"+field[i]+"'><b>"+field[i]+"</b></label>");
    document.write("<input type='"+field[i]+"' name='"+field[i]+"' id='"+field[i]+"' placeholder='"+field[i]+"'class='form-control' > <br>");
    if(field[i]=="password")
    {
      document.write("<label for='"+field[i]+"-repeat'><b>repetir "+field[i]+"</b></label>");
      document.write("<input type='"+field[i]+"' name='"+field[i]+"-repeat' id='"+field[i]+"-repeat' placeholder='"+field[i]+"'class='form-control' onblur=ValidatePass()> <br>");
    }
  }
  document.write("<p>"+msg01+"<a href='#'' style='color:dodgerblue'>Terms & Privacy</a>.</p>");
  document.write("<div class='container'>");
  for(let i=0;i<btn_su.length-1;++i)
    document.write(" <button type='submit' name='"+btn_su[i]+"' id='"+btn_su[i]+"' value='"+btn_su[i]+"' class='btn btn-"+btn_su[i]+"' style='width: 100%;'>"+btn_su[i]+"</button>");
  document.write("</div>");


}

function SignupBase() 
{
    /*
    var x = document.createElement("link");
    x.rel="stylesheet";
    x.href='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css';
    document.head.appendChild(x);
    */
//    CreatinInputSigun();
}






function SignupWithRepeatPass()
{
  document.write("<style>body {font-family: Arial, Helvetica, sans-serif;}</style>");
  document.write("<style>*{box-sizing: border-box;}</style>");
  for(let i in field)
    document.write("<style>input[type="+i+"]{width: 10%;padding: 15px;margin: 5px 0 22px 0;display: inline-block;border: none;background: #f1f1f1;}</style>");
  
  document.write("<style>input[type=text]:focus, input[type=password]:focus,input[type=email]:focus{background-color: #ddd;outline: none;} </style>");
  document.write("<style>hr {border: 1px solid #f1f1f1;margin-bottom: 25px;}</style>");
  document.write("<style>button {background-color: #4CAF50;color: white;padding: 14px 20px;margin: 8px 0;border: none;cursor: pointer;width: 100%;opacity: 0.9;}</style>");
  document.write("<style>button:hover {opacity:1;}</style>");
  document.write("<style>.cancelbtn {padding: 14px 20px;background-color: #f44336;}</style>");
  document.write("<style>.cancelbtn, .signupbtn {float: left;width: 50%;}</style>");
  document.write("<style>.container {padding: 16px;}</style>");
  document.write("<style>.clearfix::after {content:clear: both; display: table;}</style>");
  document.write("<style>@media screen and (max-width: 300px) {.cancelbtn, .signupbtn {width: 100%; }}</style>");
  document.write("<div class='container'>");
  document.write(`<h1>${h1}</h1>`);
  document.write("<p>"+msg02+"</p>");
  document.write("<hr>");
  // NOTE: was `CreatinInputSigun()` — that function doesn't exist anywhere in
  // this file (typo for the real builder below), so calling
  // SignupWithRepeatPass() threw a ReferenceError. Fixed to call the actual
  // field-rendering function.
  CreatinInputSignupMenu();
  document.write("</div>");
}




