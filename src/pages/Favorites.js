import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Favorites = ({ setTaskss, tasks } ) => {
const [tableau , setTableau ] = useState([])

useEffect(() => { 
setTaskss()
console.log(tasks)
console.log(tasks[1])
console.log(Object.keys(tasks))
console.log(Object.keys(tasks).length)
setTableau(Object.keys(tasks))
console.log(Object.keys(tasks)[2])
  }, []);

return(
<div className="favoris">
<h1>Vos favoris</h1>
<div className="charactersfav">
<h2>Personnages Favoris</h2> 
  {Object.keys(tasks).map((item,index) => {
if (tasks[item].toString().substring(0,2)==="C+"){
  console.log(tasks[item].toString().substring(0,2))
  return(
<div>

<div>
  <Link className="linkk" to={`/characters/${item}`} key={index}>
<p  key={item}>{tasks[item].toString().substring(2)} <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></p> 
</Link>
</div>
</div>
)}})}
</div>
<div className="comicsfav">
<h2>Comics Favoris</h2>
{Object.keys(tasks).map((item,index) => {
if (tasks[item].toString().substring(0,2)==="T+"){
  console.log(tasks[item].toString().substring(0,2))
  return(
<div>
<div>
<p  key={item}>{tasks[item].toString().substring(2)} </p> 
</div>
</div>
)}})}
</div>
</div>
)}

    
export default Favorites;
