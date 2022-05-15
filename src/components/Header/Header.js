import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const Header = ({ token, username, setUser }) => {

console.log("dans mon header")
console.log(token)
console.log(username)

const logout = () =>{
  console.log("danslogout")
  Cookies.remove("token") || Cookies.remove("username")
  Cookies.remove("token")
  setUser()
  console.log(token)
console.log(username)
}



  return ( 
        <div className="menu">
 

          <section>    <Link to="/characters"><h1 className="headertitle first">Personnages</h1> </Link></section>
          <section>    <Link to="/comics"><h1 className="headertitle">   Comics</h1></Link></section>
          <section>    <Link to="/favorites"><h1 className="headertitle last"> Favoris</h1></Link></section>
          <section>   
            
            {(token && token !== "undefined")?
          
            
          <h1
            onClick={()=>logout()} >Logout {username}</h1> :
            <Link to="/login"><h1 className="headertitle">Login/SignUp</h1></Link> }
             
             </section> 
        </div>
  )

}
export default Header;
