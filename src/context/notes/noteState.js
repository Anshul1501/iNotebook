import React, { useState } from "react";
import NoteContext from "./NoteContext"; // Import the context object

const NoteState = (props) => {
  const noteInitial = [
    {
      _id: "66092cbde5c5safdwqerb8s23f6f0e01b",
      user: "65b7a013a1f0aef215fad245",
      title: "newtitle ",
      description: "what's up",
      tag: "newsasdf",
      date: "1711877309728",
      __v: 0,
    },
    {
      _id: "66093afbb45ddcsdf677bbe96b1d",
      user: "65b7a013a1f0aef215fad245",
      title: "new title here",
      description: "wake up early",
      tag: "newsasdf",
      date: "1711880955332",
      __v: 0,
    },
    {
      _id: "66092cbdewqe5cs5b823f6f0e01b",
      user: "65b7a013a1f0aef215fad245",
      title: "newtitle ",
      description: "what's up",
      tag: "newsasdf",
      date: "1711877309728",
      __v: 0,
    },
    {
      _id: "66092cbde523dc5b823f6f0e01b",
      user: "65b7a013a1f0aef215fad245",
      title: "newtitle ",
      description: "what's up",
      tag: "newsasdf",
      date: "1711877309728",
      __v: 0,
    },
    {
      _id: "66092cbddsfge5c5b8s23f6f0e01b",
      user: "65b7a013a1f0aef215fad245",
      title: "newtitle ",
      description: "what's up",
      tag: "newsasdf",
      date: "1711877309728",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(noteInitial);

  //Add Note function
  const addNote = (title, description, tag) => {
    //To Do API Call
   const  note = {
      _id: "66092cbddsfge5c5b8s23f6f0e01b",
      user: "65b7a013a1f0aef215fad245",
      title: "newtitle ",
      description: "what's up [ADDED]",
      tag: "newsasdf",
      date: "1711877309728",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete Note function
  const deleteNote = () => {};

  //Edit Note function
  const editNote = () => {};

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
