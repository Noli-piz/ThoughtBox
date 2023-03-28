//rfce
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import speakerBox from '../../assets/ThoughtBox.png'
import axios from 'axios';
import {ApiContext} from '../../context/Context'
import {AiOutlineLoading3Quarters,AiFillCheckCircle } from 'react-icons/ai';
import {IoMdRadioButtonOff } from 'react-icons/io';
import logo from '../../assets/logo.png'

function Register() {
    let navigate = useNavigate();
    const { ApiBaseUrl } = useContext(ApiContext);

    const [ showLoading, setShowLoading ] = useState(false);
    const [ username, setUsername ] = useState(' ');
    const [ password, setPassword ] = useState(' ');
    const [ confirmPassword, setConfirmPassword ] = useState(' ');
    const [ notEqualPass, setNotEqualPass ] = useState(false);

    const [passContent] = useState([
        { title : 'Min8', condition_meet : false },
        { title : 'UppercaseAndLowercase', condition_meet : false },
        { title : 'NumAndLetter', condition_meet : false },
        { title : 'SpecialCharacter', condition_meet : false },
        { title : 'Whitespace', condition_meet : false },
      ]);

      
    const onPassContentChecker = (pass)=>{
        setPassword(pass);
        setNotEqualPass(false);

        // Start of Checking Password Content
        // Check if password have 8+ character
        if(pass.length > 7){
            passContent[0].condition_meet= true;
        }else{
            passContent[0].condition_meet= false;
        }

        // Password have atleast 1 Uppercase and 1 Lowercase
        var formatUppercase = /[A-Z]/;
        var formatLowercase = /[a-z]/;
        if (formatUppercase.test(pass) && formatLowercase.test(pass)){
            passContent[1].condition_meet= true;
        }else{
            passContent[1].condition_meet= false;
        }
        
        // Password have atleast number and letter
        var formatNumber = /\d/;
        var formatString = /\D/;
        if (formatNumber.test(pass) && formatString.test(pass) ){
            passContent[2].condition_meet= true;
        }else{
            passContent[2].condition_meet= false;
        }

        // Password have Special Characters
        var formatSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (formatSpecialChar.test(pass)){
            passContent[3].condition_meet= true;
        }else{
            passContent[3].condition_meet= false; 
        }

        // Password have no Whitespaces
        var formatNoWhitespace = /\s/;
        if (!formatNoWhitespace.test(pass)){
            passContent[4].condition_meet= true;
        }else{
            passContent[4].condition_meet= false; 
        }  

    }

    const onSubmit = () =>{

        // Checking all input if Valid
        let error_count =0;
        if(username.trim() === '') {
            setUsername('');
            error_count = 1;
        }

        // Atleast 4 character username
        if(username.length < 4) {
            error_count = 1;
        }

        if(password.trim() === '') {
            setPassword('');
            error_count = 1;
        }
        if(confirmPassword.trim() === '') {
            setConfirmPassword('');
            error_count = 1;
        }  
        
        if(confirmPassword.trim() !== password) {
            setNotEqualPass(true);
            error_count = 1;
        }  

        if(error_count === 1) return;

        // Check if all password content is valid
        for(let i=0; i < passContent.length ;i++){
            if(!passContent[i].condition_meet) {
                return alert("Password does not meet the requirements!");
            }
        }

        //
        setShowLoading(true);

        axios.post( ApiBaseUrl +'/accounts/register' , 
        { "username" : username , "password" : password }
        ).then(function (response) {
            if(response.data.error)
                return alert(response.data.error);

            setTimeout( function () {
                localStorage.setItem("username", username);
                alert("Account Successfully Created! You will be redirected to the Login Page!");
                navigate("/login")
            },1000);
        });
    }

  return (
    <div className="register-container">
        <div className="register-form-container">

            <div className="img-container"> 
                <img src={logo} alt="img" /> 
            </div>

            <div className="register-form" >

                <div className="logo-container">  
                    <img src={speakerBox} className="register-logo" alt="img" /> 
                </div>
                
                <br/>
                <br/>

                <form> 
                    <input 
                        type="text" 
                        className="inputBox" 
                        placeholder="Enter Username"
                        value={username.trim()}
                        onChange={(e) => {setUsername(e.target.value.trim())}} 
                        />
                    { !username && <div style={{width:"335px", color:"red", transform:"translate(8px, -18px)", fontSize:"14px"}} > Username is required! </div>}
                    { username !== " " && username.length < 4 && <div style={{width:"335px", color:"red", transform:"translate(8px, -18px)", fontSize:"14px"}} > Please enter atleast 4 characters. </div>}


                    <input 
                        type= "password" 
                        className="inputBox" 
                        placeholder="Enter Password" 
                        value={password.trimEnd()}
                        onChange={(e) => {onPassContentChecker(e.target.value.trimEnd())}} 
                        />
                    { !password && <div style={{width:"335px", color:"red", transform:"translate(8px, -18px)", fontSize:"14px"}} > Password is required! </div>}
                    
                    <input 
                        type= "password" 
                        className="inputBox" 
                        placeholder="Enter Confirm Password"
                        value={confirmPassword.trimEnd()}
                        onChange={(e) => {setConfirmPassword(e.target.value.trimEnd())}} 
                        />
                    { !confirmPassword && <div style={{width:"335px", color:"red", transform:"translate(8px, -18px)", fontSize:"14px"}} > Confirm password is required! </div>}
                    { notEqualPass && <div style={{width:"335px", color:"red", transform:"translate(8px, -18px)", fontSize:"14px"}} > Password and Confirm password is not equal! </div>}
             

                    {/* <label>
                        By clicking Register, You understand and agree to the Terms and Condition and Privacy Policy.
                    </label> */}

                    <div  style={{width:"325px", margin:"10px 0px 30px 0px"}}>
                        <div> Password Content: </div>
                        <div className="icon-password-container"> 
                        { passContent[0].condition_meet ? <AiFillCheckCircle className="icon-password-content" /> : <IoMdRadioButtonOff className="icon-password-content"/> } 
                        At least 8 characters 
                        </div>

                        <div className="icon-password-container"> 
                        { passContent[1].condition_meet ? <AiFillCheckCircle className="icon-password-content" /> : <IoMdRadioButtonOff className="icon-password-content"/> } 
                        Mixture of both uppercase and lowecase letter 
                        </div>

                        <div className="icon-password-container"> 
                        { passContent[2].condition_meet ? <AiFillCheckCircle className="icon-password-content" /> : <IoMdRadioButtonOff className="icon-password-content"/> } 
                        Mixture of letters and numbers 
                        </div>

                        <div className="icon-password-container"> 
                        { passContent[3].condition_meet ? <AiFillCheckCircle className="icon-password-content" /> : <IoMdRadioButtonOff className="icon-password-content"/> } 
                        Atleast have one special character, e.g., ! @ # ? ]
                        </div>

                        <div className="icon-password-container"> 
                        { passContent[4].condition_meet ? <AiFillCheckCircle className="icon-password-content" /> : <IoMdRadioButtonOff className="icon-password-content"/> } 
                        No whitespace
                        </div>
                    </div>

                    <button 
                        type="button" 
                        onClick={()=>onSubmit()} 
                        className="btnRegister"> 
                    { !showLoading ? 'REGISTER' : <AiOutlineLoading3Quarters className="icons refresh"/>} 
                    </button>
                </form>

                <br/>
                <br/>
                <br/>

                <div style={{width:"100%", display:"flex", justifyContent:"center", fontWeight:"bold"}} > 
                    Already have an account? 
                    <Link to="/login" style={{marginLeft:"5px", color:"blue",  textDecoration : "none"}}> Log In. </Link> 
                </div>

                <br/>
                <br/>
                <br/>
            </div>

        </div>
    </div>
  )
}

export default Register