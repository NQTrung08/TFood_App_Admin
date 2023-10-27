import { useState, useEffect } from 'react';
import './App.css';
import { getDatabase, ref, onValue, get, child } from "firebase/database";
import { database } from "./firebase";
import Table from 'react-bootstrap/Table';
import { AiOutlineDelete } from 'react-icons/ai'
import Routers from './routers/Routers';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


function App() {
  return (
  
    <div className='App'>
      <ToastContainer/>
      <Router>
        <Routers/>
    </Router>
    </div>
    
  );
}

export default App;
