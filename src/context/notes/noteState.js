import React, { useState } from "react";
import NoteContext from "./NoteContext"; // Import the context object

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const noteInitial = [];

  const [notes, setNotes] = useState(noteInitial);

  // Get all notes
  const getNotes = async () => {

    //API CALL
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "content-type" : "application/json",
          "auth-token" : localStorage.getItem('token')
        },
      });
      const json = await response.json();
      console.log(json);
      setNotes(json); // Update state with fetched notes
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add Note function
  const addNote = async ({title, description, tag}) => {  // data should be passed as 
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const note = await response.json();
      console.log("Note added:", note);
      setNotes([...notes, note]); // Update state with new note
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete Note function
  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "auth-token":
            localStorage.getItem('token')
        },
      });
      console.log("Note deleted:", id);
      setNotes(notes.filter((note) => note._id !== id)); // Update state by removing the deleted note
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  //Edit Note function
  const editNote = async ({id, title, description, tag}) => {
    //TO DO: API CALL
    //Logic to edit in client

    const response = await fetch(
      `${host}/5000/api/notes/updatenote/${id}`,
      {
        //end point update API
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      }
    );

    const json = response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
