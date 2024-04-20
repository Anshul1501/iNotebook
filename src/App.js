import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from './context/notes/NoteState'; 
import Alert from "./components/Alert";
import Login from "./components/Login";
import Singup from "./components/Singup";
import { useState } from "react";

function App() {


      //pass alert state as object
      const[alert, setAlert] = useState(null);

   //Alert Message as an object
    const showAlert = (message, type) => {
    setAlert({
            msg: message,
            type: type
    });
   }

   //Auto Dismiss Alert message 

   setTimeout (() => {
    setAlert(null);
   },3000)

  return (
         <NoteState>
               <>
        <div>
          <Router>
            <Navbar />
            <Alert alert={alert}/>
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/Login" element={<Login showAlert={showAlert} />} />
              <Route path="/Singup" element={<Singup showAlert={showAlert} />} />
            </Routes>
          </Router>
        </div>
      </>
         </NoteState>
  );
}

export default App;
