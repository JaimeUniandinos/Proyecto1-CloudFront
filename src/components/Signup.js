import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const API = process.env.REACT_APP_API;

export const Signup =  () => {

    const[email, setEmail]=useState('');
    const[password, setPassword]=useState('');
    const[coPassword, setCoPassword]=useState('');
    const history= useHistory();
    
    const handleClick= async (e) =>{
        
        const res = await fetch(`${API}/signup`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    email,
                    password,
                    coPassword
                    
                }
            )
        })
        const data = await res.text();
        console.log(data)
        if(data==='ok'){
            history.push("/Login")
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
            <input type="password" 
            placeholder="Confirm Password" 
            value={coPassword}
            onChange={(e)=>setCoPassword(e.target.value)}
            />
            <button onClick={handleClick}>Signup</button>
        </div>
    </div>

)
}