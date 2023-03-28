//rfce
import React, {useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm} from 'react-hook-form'
import axios from 'axios'
import speakerBox from '../../assets/ThoughtBox.png'
import {LoginContext, ApiContext, AlertContext} from '../../context/Context'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import logo from '../../assets/logo.png'

function LoginUser() {

    let navigate = useNavigate();
    const { register, handleSubmit, reset ,formState: { errors }, } = useForm();
    const { ApiBaseUrl } = useContext(ApiContext)
    const { setUsername, setRoles, setAccessToken } = useContext(LoginContext)
    const { setAlert } = useContext(AlertContext);
    const [ showLoading , setShowLoading] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("username");
        if(user)
            reset({username: user});
    }, [1]);

    const onSubmit = (data) =>{
        setShowLoading(true);

        axios.get( ApiBaseUrl + '/accounts/login' ,
        { 'params' : { 'username' : data.username , 'password' : data.password } }
        ).then(function (response) {
            if(response.data.error){
                setShowLoading(false);
                return setAlert({"action" : "error", "message": response.data.error}); 
            }

            
            setTimeout(() => {
                setUsername(data.username);
                setAccessToken(response.data.accessToken); 
                setRoles("user");

                localStorage.setItem("username" , data.username);
                localStorage.setItem("roles" , "user");
                if(data.loggedin){ 
                    localStorage.setItem("accessToken" , response.data.accessToken);
                }

                setShowLoading(false);    
                setAlert({"action" : "success", "message": "Log In Success!"}); // Show and Set Alert Message
                navigate("/home")
            }, 2000)

        });
    }

    const onLoginAsGuest = () => {
        setRoles("guest");
        navigate("/guest")
        setUsername('');
        localStorage.removeItem("username");
    }

    
  return (
    <div className="login-container">
        <div className="login-form-container">

            <div className="img-container"> 
                <img className="logo-login" src={logo} alt="img" /> 
            </div>

            <div className="login-form" >

                <div className="logo-container">  
                    <img src={speakerBox} className="login-logo" alt="img" /> 
                </div>
                
                <br/>
                <br/>

                <form onSubmit={handleSubmit(onSubmit)} > 
                    <input 
                        type="text" 
                        className="inputBox" 
                        placeholder="Enter Username"  
                        {...register('username', { required: true })} />
                    
                    {errors.username && <div style={{color:"red", fontSize:"10pt", margin:"-15px 0px 20px 5px"}} >  Please enter username! </div>}

                    <input 
                        type= "password" 
                        className="inputBox" 
                        placeholder="Enter Password" 
                        {...register('password', { required: true })}  />
                    
                    {errors.password && <div style={{color:"red", fontSize:"10pt", margin:"-15px 0px 20px 5px"}} >  Please enter password! </div>}
                    
                    
                    <label style={{marginLeft:"5px"}}>
                        <input
                            type= "checkbox"
                            {...register('loggedin')}  /> Keep me logged in
                    </label>

                    <br/>
                    <br/>
                    <br/>

                    <button 
                        type="submit" 
                        onClick={()=>onSubmit} 
                        className="btnLogin"> 
                            { showLoading ? <AiOutlineLoading3Quarters className="icons refresh"/> : "LOG IN" }    
                    </button>
                </form>

                <br/>
                <br/>
                <br/>

                <div style={{width:"100%", display:"flex", justifyContent:"center", fontWeight:"bold"}} >
                    Don't have an account?  
                    <Link to="/register"  style={{marginLeft:"5px", color:"blue", textDecoration : "none"}}> Create One. </Link>
                </div>
                <br/>
                <div style={{width:"100%", display:"flex", justifyContent:"center", fontWeight:"bold"}} >
                    or
                    <a onClick={()=>onLoginAsGuest()}  style={{marginLeft:"5px", color:"blue", textDecoration : "none", cursor:"pointer"}}> Proceed as Guest. </a> 
                </div>

                <br/>
                <br/>
                <br/>
            </div>
        </div>
    </div>
  )
}

export default LoginUser