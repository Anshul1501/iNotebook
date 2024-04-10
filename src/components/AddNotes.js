import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNotes = () => {

  const { addNotes } = useContext(NoteContext);

  const [note, setNote] = useState({title: "", description: "", tag: ""})

  const handleOnClick = () => {
    addNotes(note);
  }

  const onChange = (e) => {
      setNote({...note, [e.target.name]: e.target.value});
  }

  return (
         <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label"> {/* htmlFor = "title" */}
            Title
          </label>
          <input
            type="text"                       /* type = "text" */
            className="form-control"
            id="title"                        /*id = "title"*/
            aria-describedby="emailHelp"
            onChange={onChange}               /*onChange = {onChange}*/
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            onChange={onChange}         /* onChange = {onChange} */
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleOnClick}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddNotes
