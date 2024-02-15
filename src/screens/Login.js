import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function Login() {

  const [credentials,setcredentials] = useState({email:"",password:""});

   let navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:credentials.email, password:credentials.password})
        });

        const json= await response.json();
        console.log(json);

        if(!json.success){  //true or false
            alert('Enter valid credentials!')
        }

        if(json.success){
          localStorage.setItem("userEmail", credentials.email);
          localStorage.setItem("authToken", json.authToken);
          console.log(localStorage.getItem("authToken"))
          navigate("/");
        }


    }

    const onChange=(event)=>{
        setcredentials({...credentials ,[event.target.name]:event.target.value});
    }

  return (
    <>
        <div className="container" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:"center", margin:"70px"}}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" id="exampleInputEmail" className="form-control" name="email" value={credentials.email} onChange={onChange} placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
               
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} placeholder="Password"/>
                </div>
               
                <button type="submit" className="btn" style={{ backgroundColor:'#F58F1D'}} >Submit</button>
                <Link to='/createUser' className='m-3 btn' style={{ backgroundColor:'#27B0D5'}} >New user?</Link> 
            </form>
        </div>
    </>
  )
}
