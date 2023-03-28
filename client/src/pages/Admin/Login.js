//rfce
import React, {useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm} from 'react-hook-form'
import axios from 'axios'
import speakerBox from '../../assets/ThoughtBox.png'
import {LoginContext, ApiContext} from '../../context/Context'
import logo from '../../assets/logo.png'

function LoginUser() {

    let navigate = useNavigate();
    const { register, handleSubmit, reset ,formState: { errors }, } = useForm();
    const { ApiBaseUrl } = useContext(ApiContext)
    const { setUsername, setRoles, setAccessToken } = useContext(LoginContext)

    useEffect(() => {
        const user = localStorage.getItem("username");
        if(user)
            reset({username: user});
    }, [1]);

    const onSubmit = (data) =>{

        axios.get( ApiBaseUrl + '/auth/admin/login' ,
        { 
            'params' : { 'username' : data.username , 'password' : data.password }
        }
        ).then(function (response) {
            if(response.data.error)
                return alert(response.data.error);


            setUsername(data.username);
            setAccessToken(response.data.accessToken); 
            setRoles("admin");

            localStorage.setItem("username" , data.username);
            localStorage.setItem("roles" , "admin");
            if(data.loggedin){ 
                localStorage.setItem("accessToken" , response.data.accessToken);
            }
            

            alert(response.data.success);
            navigate("/admin/home")
        });
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
                
                <div className="admin-access">
                    Administrator Access
                </div>

                <form onSubmit={handleSubmit(onSubmit)} > 
                    <input 
                        type="text" 
                        className="inputBox" 
                        placeholder="Enter Username"  
                        {...register('username', { required: true })} />
                    
                    {errors.username && <p style={{color:"red", fontSize:"10pt", margin:"-15px 0px 20px 5px"}} >  Username is required! </p>}

                    <input 
                        type= "password" 
                        className="inputBox" 
                        placeholder="Enter Password" 
                        {...register('password', { required: true })}  />
                    
                    {errors.password && <p style={{color:"red", fontSize:"10pt", margin:"-15px 0px 20px 5px"}} >  Password is required! </p>}
                    
                    
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
                        className="btnLogin"> LOG IN </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginUser