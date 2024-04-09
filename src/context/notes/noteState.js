import React, { useState } from 'react';
import  NoteContext  from './NoteContext'; // Import the context object

const NoteState = (props) => {

   const noteInitial = [
    {
      "_id": "66092cbde5c5b823f6f0e01b",
      "user": "65b7a013a1f0aef215fad245",
      "title": "newtitle ",
      "description": "what's up",
      "tag": "newsasdf",
      "date": "1711877309728",
      "__v": 0
    },
    {
      "_id": "66093afbb45dc677bbe96b1d",
      "user": "65b7a013a1f0aef215fad245",
      "title": "new title here",
      "description": "wake up early",
      "tag": "newsasdf",
      "date": "1711880955332",
      "__v": 0
    },
    {
      "_id": "66092cbde5c5b823f6f0e01b",
      "user": "65b7a013a1f0aef215fad245",
      "title": "newtitle ",
      "description": "what's up",
      "tag": "newsasdf",
      "date": "1711877309728",
      "__v": 0
    },
    {
      "_id": "66092cbde5c5b823f6f0e01b",
      "user": "65b7a013a1f0aef215fad245",
      "title": "newtitle ",
      "description": "what's up",
      "tag": "newsasdf",
      "date": "1711877309728",
      "__v": 0
    },
    {
      "_id": "66092cbde5c5b823f6f0e01b",
      "user": "65b7a013a1f0aef215fad245",
      "title": "newtitle ",
      "description": "what's up",
      "tag": "newsasdf",
      "date": "1711877309728",
      "__v": 0
    },
  ];

  const [notes, setNotes] = useState(noteInitial); 

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
