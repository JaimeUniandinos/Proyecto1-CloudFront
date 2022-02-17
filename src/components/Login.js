import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const API = process.env.REACT_APP_API;

export const Login = () => {

    const[email, setEmail]=useState('');
    const[password, setPassword]=useState('');
    const history= useHistory();
    
    const handleClick= async (e)=>{
        
        const res = await fetch(`${API}/login`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    email,
                    password
                    
                }
            )
        })
        const data = await res.text();
        console.log(data)
        if(data==='User and password ok'){
            history.push("/Contents")
        }
        

        
    }

    return(
    <div className="text-center mt-5">
        <h1>LOGIN</h1>
        <div>
            <input 
            type="text" 
            placeholder="EMAIL"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            
            <input type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button onClick={handleClick}>Login</button>
        </div>
    </div>

)
}