import { useState, useEffect } from "react";
import axios from "axios";
import { useParams} from "react-router-dom";


const ComicsId = () => {
  const { id } = useParams();
  const [skip, setSkip] = useState(0)
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {    console.log("fetdata en cours")
    const fetchData = async (req, res) => {
  
      const response = await axios.post(
        "https://marvelmdabackv3.herokuapp.com/:comicsId",
        {
          id: id,
        }
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [skip]);
  return isLoading === true ? (
    <div className="chargement">En cours de chargement</div>
  ) : (

<div className="ficheNiv1">
<div>{data.name}</div>
<div>{data.description}</div> 
<img style={{width:150}} src={`${data.thumbnail.path}.${data.thumbnail.extension}`} alt="" />     
{data.comics.map((item, index) => {
    return (
<div key={index}>{item}</div>
 )
}
    ) 
    }
</div>  

   
  )}
export default ComicsId;
