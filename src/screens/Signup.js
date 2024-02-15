import React, { useState } from 'react';
import {Link} from 'react-router-dom';
export default function Signup() {

    const [credentials,setcredentials] = useState({name:"",geolocation:"",email:"",password:""});

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/creatUser",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:credentials.name, location:credentials.geolocation, email:credentials.email, password:credentials.password})
        });

        const json= await response.json();
        console.log(json);

        if(!json.success){
            alert('Enter valid credentials!')
        }

    }

    const onChange=(event)=>{
        setcredentials({...credentials ,[event.target.name]:event.target.value});
    }
    return (
        <>
        <div className="container" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:"center", margin:"70px"}}>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control"  name="name" value={credentials.name} onChange={onChange} placeholder="Enter your name"/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" id="exampleInputEmail" className="form-control" name="email" value={credentials.email} onChange={onChange} placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputPassword1">Address</label>
                    <input type="text" className="form-control" id="exampleInputPassword" name="geolocation" value={credentials.geolocation} onChange={onChange} placeholder="address"/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} placeholder="Password"/>
                </div>
               
                <button type="submit" className="btn" style={{ backgroundColor:'#F58F1D'}} >Submit</button>
                <Link to='/login' className='m-3 btn' style={{ backgroundColor:'#27B0D5'}}>Already a user</Link> 
            </form>
        </div>
        </>
    )
}
