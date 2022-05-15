import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faThumbtack , faMagnifyingGlass ,faHeart,faEnvelope, faKey, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages

import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import CharactersId from "./pages/CharacterByID"
import ComicsId from "./pages/ComicsByID"
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
//components
import Header from './components/Header/Header';

 import Cookies from "js-cookie";
 library.add( faStar, faThumbtack ,faMagnifyingGlass ,faHeart, faEnvelope, faKey, faListAlt);


function App() {

console.log("app lancée")
const [tasks, setTasks] = useState(Cookies.get() || null);
  const [id, setId] = useState("null");

  const setTaskss = ()=>{
    setTasks(Cookies.get())
    console.log((tasks))
    console.log(Object.keys(tasks));

  }


  const [token, setToken] = useState(Cookies.get("token") || null);
  const [username, setUsername] = useState(Cookies.get("username") || null);
  const setUser = (token,username) => {
    if (token !== null) {
      //Action de connexion
      console.log("Création d'un cookie userTOken");
      Cookies.set("token", token, { expires: 10 });
      Cookies.set("username", username, { expires: 10 });
    } else {
      //action de déconnexion
      console.log("Suppression d'un cookie userToken");
      Cookies.remove("token");
      Cookies.remove("username");
    }

  

  setToken(token);
    console.log(`Mise à jour du state Token avec ${token}`);
    setUsername(username);
    console.log(`Mise à jour du state Token avec ${username}`);
  };


  return (
    <Router>
      
          <Header  token={token} username={username} setUser={setUser}/>
      <Routes>
      <Route path="/" element={<Characters/>} />
      <Route path="/login" element={<Login  setUser={setUser}    /> }/>
      <Route path="/signup" element={<SignUp setUser={setUser}  />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favorites" element={<Favorites tasks={tasks}  setTaskss={setTaskss}/>} />
        <Route path="/characters/:id" element={<CharactersId id={id}/>} />
        <Route path="/comics/:id" element={<ComicsId id={id}/>} />
      </Routes>
    </Router>
  );
}

export default App;

