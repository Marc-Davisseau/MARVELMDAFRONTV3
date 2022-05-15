import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState(0);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    setError(0);
    try {
      event.preventDefault();
      console.log("hello")
      const response = await axios.post(
        "https://marvelmdabackv3.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

     console.log(response.data);
     console.log(response.data.account.username);
      if (response.data.token) {
        setUser(response.data.token,response.data.account.username);
        console.log("j'y suis log")
         navigate("/");
      }

    } catch (error) {
      console.log(error.response.data.message)
      if (error.response.data.message === "Login failled") {
        setError(1);
      } else if (
        error.response.data.message === "Email and Password are required"
      ) {
        setError(2);
      }
}

   
  }

  return (
    <div className="login">
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <input className="input-login"
        value={email}
        placeholder="email"
        type="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <br />
      <input className="input-login"
        type="password"
        placeholder="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <input className="input-login" type="submit" value="Se connecter" />
      <br />
      <div>
      {error === 1 ? (
        <p className="error">Login failled</p>
      ) : error === 2 ? (
        <p className="error">Merci de remplir tous les champs</p>
      ) : null}
        </div>
    </form>
     <Link to="/signup"><h2>Créer un compte</h2></Link>
     </div>
  );
};


export default Login;
