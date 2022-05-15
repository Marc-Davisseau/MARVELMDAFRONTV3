import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

 

  const handleSignup = async (event) => {
    try {
      event.preventDefault();
      //je viens reset le message d'erreur à chaque tentative
      setErrorMessage("");
      //une requête au serveur pour créer un nouveau user
      // axios.post("url", body)

      const response = await axios.post(
        "https://marvelmdabackv3.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      if (response.data) {
        console.log("J'ai bien réussi à créer un compte");
         setUser(response.data.token, username);
        // const token = username;
console.log(response.data.token)
console.log(response.data.token)
console.log("j'y suis")
// Cookies.set("token", token,{ expires: 7 });
let token =Cookies.get("token")
navigate("/characters" , { state: { name: `${token}`} });
       ;
      }
else{
  console.log("J'ai bien réussi à créer un compte");
}


    } catch (error) {
      if (error.response.data.message === "Le formulaire n'est pas correctement rempli") {
        setErrorMessage("Le formulaire n'est pas correctement rempli");
      }
else if ( error.response.data.message === "User already knows") {

  setErrorMessage("L'utilisateur est déjà connu");
}


    }
  };
  return (
    <div className="login">
      <h1>Sign up </h1>
      <form onSubmit={handleSignup}>
        <input className="input-login"
          value={username}
          type="text"
          placeholder="username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />

        <input className="input-login"
          value={email}
          type="email"
          placeholder="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />

        <input className="input-login"
          value={password}
          type="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />  
        <div className="newsletter">
        <input className="newsletterinput"
          value={newsletter}
          type="checkbox"
          placeholder="password"
          onChange={(event) => setNewsletter(event.target.checked)}
        />  
        <p>Souscrire à la newletter</p>
        </div>
        <br />
        <input className="input-login" type="submit" value="S'inscrire" />
        <p>{(errorMessage)?<p className="error">{errorMessage}</p> :null}</p>
      </form>
    </div>
  );
};


export default Signup;
