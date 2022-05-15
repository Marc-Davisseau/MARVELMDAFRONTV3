import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";





const CharactersId = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

console.log("hello id")
   
    const fetchData = async () => {
      console.log(id)
      const response = await axios.post(
        `https://marvelmdabackv3.herokuapp.com/character/:characterId`, {
            id: id
        }
      );
         
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return isLoading === true ? (
    <div className="chargement">En cours de chargement</div>
  ) : (

<div className="ficheNiv1ID">
<div>
  <h1> {data.name}</h1>
 </div>
<img style={{width:350}} src={`${data.thumbnail.path}.${data.thumbnail.extension}`} alt="" />
<div className="descriptionCharacters">{data.description}</div>  
  </div>
 )

}
     

export default CharactersId;


