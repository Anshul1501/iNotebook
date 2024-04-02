import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"

const Home = () => {

    const context = useContext(noteContext);
    const{notes, setNotes} = context; // Destructure 'notes' from context instead of 'note'


    return (
      
      <div class="container my-5">
        <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" />
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

  {/* Mapping through 'notes' instead of 'note' */}
  
{notes.map((note) => {
      return  notes.title;
})}
      </div>

    )
}

export default Home;