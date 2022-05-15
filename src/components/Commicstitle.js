import React, { useEffect, useState } from 'react';
import axios from "axios";

const Commicstitle = (props) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    console.log(props.Id+"hellloo")
    useEffect(() => {
        console.log(props.id+"hellloo")

            const fetchData = async () => {
        
              const response = await axios.post(
                "https://marvelbackmda.herokuapp.com/comics/:comicsId",
        {
          id: props.id,
        }
                
              );
              
              // console.log(response.data);
              setData(response.data);
              setIsLoading(false);
            };
            fetchData();
          }, []);
          return isLoading === true ? (
            <div>En cours de chargement</div>
          ) :
     (



<div>

{/* {data.comics.map((item, index) => {
// const keys = Object.keys(item)
     return ( 
  <div>
hello
  </div>
        )
     }
)} */}

 </div>  
   )



  

};

export default Commicstitle;