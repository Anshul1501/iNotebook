import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'

const Login = () => {
    
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.id]: e.target.value })
    }

    const handleOnSubmit = async (e) => {

        const host = "http://localhost:5000";

        e.preventDefault();

        //API CALL TO LOGIN USER
        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }) // Include user credentials in the request body
            });

            if (!response.ok) {
                // Handle non-successful response (e.g., display error message)
                throw new Error('Failed to login. Please check your credentials.');
            }

            const json = await response.json();
            console.log(json);
            
            // Handle successful login (e.g., redirect user to dashboard)
            if(json.success){
                //save the auth token and redirect 
                localStorage.setItem('token', json.authtoken);
                navigate('/'); //navigate to home 
            }
            else {
                alert("Invalid credentials");
            }

        } catch (error) {
            console.error("Error logging in:", error.message);
            // Handle error (e.g., display error message to the user)
        }
    };

    return (
        <div className='container my-5'>
            <form onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" value={credentials.email}  />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} placeholder="Password" value={credentials.password} />
                </div>

                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
        </div>
    )
}

export default Login
