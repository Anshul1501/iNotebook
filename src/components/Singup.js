import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'

const Singup = (props) => {

   let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ name: "" ,email: "", password: "", cpassword: "" });

  const onChange = (e) => {
      console.log(e.target.value);
      setCredentials({...credentials, [e.target.id]: e.target.value })
  }

  const handleOnSubmit = async (e) => {

      const host = "http://localhost:5000";

      e.preventDefault();
      const {name, email, password} = credentials; //destructue data from credentials

      //API CALL TO LOGIN USER
      try {
          const response = await fetch(`${host}/api/auth/createuser`, {
              method: "POST",
              headers: {
                  "content-type": "application/json"
              },
              body: JSON.stringify({ name, email, password}) // Include user credentials in the request body
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
               props.showAlert("Account Created Successfully", "success");
          }
          else {
             props.showAlert("Invalid credentials", "danger");
          }

      } catch (error) {
          console.error("Error logging in:", error.message);
          props.showAlert("Invalid credentials", "danger");
          // Handle error (e.g., display error message to the user)
      }
  };

  return (
    <div className='container my-5'>
       <h2>Create an Account to use iNotebook</h2>
    <form onSubmit={handleOnSubmit}>
      <div className="form-group my-3">
        <label htmlFor="name"> Name</label>
        <input type="text" className="form-control" id="name" aria-describedby="nameHelp" onChange={onChange} placeholder="Enter Name" value={credentials.name} />
      </div>
  
      <div className="form-group my-3">
        <label htmlFor="email">Email address</label>
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" value={credentials.email} />
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
  
      <div className="form-group my-3">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" id="password" onChange={onChange} placeholder="Password" value={credentials.password} minLength={5} required />
      </div>
  
      <div className="form-group my-3">
        <label htmlFor="cpassword">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword" onChange={onChange} placeholder="Confirm Password" value={credentials.cpassword} minLength={5} required />
      </div>
  
      <button type="submit" className="btn btn-primary my-3">Submit</button>
    </form>
  </div>
  )
}

export default Singup
