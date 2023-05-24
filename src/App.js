import './App.css';
import { Auth } from "./components/authenticate";
import { Auth_done } from "./components/authenticated";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import {useState} from 'react'

function App() {

  const [user, setLoginUser]=useState({})

  const userString = localStorage.getItem('user');
  const allow=userString==='true'
  const userstring=localStorage.getItem('userdb')
  const userjson= JSON.parse(userstring)


  return (
    <>
      <Router>
        <div className="App-media">
         <Routes>
          <Route exact path='/' element={allow ? <Auth_done name={userjson.username} setLoginUser={userjson}/>: <Auth setLoginUser={setLoginUser}/>}/>
          <Route path='/' element={<Auth setLoginUser={setLoginUser}/>}/>
         </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
