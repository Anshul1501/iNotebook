import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from './context/notes/NoteState'; 
import Alert from "./components/Alert";
import Login from "./components/Login";
import Singup from "./components/Singup";

function App() {
  return (
         <NoteState>
               <>
        <div>
          <Router>
            <Navbar />
            <Alert message="This is Alert!"/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Singup" element={<Singup />} />
            </Routes>
          </Router>
        </div>
      </>
         </NoteState>
  );
}

export default App;
