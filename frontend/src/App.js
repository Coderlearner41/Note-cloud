import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/notes/NotesState";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import React,{useState} from 'react'
import Alert from "./Components/Alert";




function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1000);
  }
  return (
    <NoteState>
      <Alert alert={alert}/>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/About" element={<About />} />
            <Route path="/Login" element={<Login showAlert={showAlert}/>} />
            <Route path="/SignUp" element={<SignUp showAlert={showAlert} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
