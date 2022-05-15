import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Characters = () => { 

  const [tasks, setTasks] = useState([  ]);
  const [term, setTerm] = useState('');
  const [skip, setSkip] = useState(0)
  const [pages, setPages] = useState(0)
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
 
 
  const handleCheckbox = (index, itemid, pages, itemname) => {
    const token = itemid
    if(Cookies.get(token)){
      Cookies.remove(`${token}`);
    }
    else{
      Cookies.set(`${token}`, `C+${itemname}`,{ path: '/' });
    }
    setTasks(Cookies.get())
  };

  useEffect(() => {

    const fetchData = async () => {
      console.log(skip)
      console.log(pages)
      const response = await axios.post(
        `https://marvelbackmda.herokuapp.com/characters`,
        {
          skip: skip,
          name: term
        }     
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [skip, term,pages]);
  return isLoading === true ? (
    <div className="chargement">En cours de chargement</div>
  ) : (

<div className="ficheNiv1">
<h1 className="titlesection">Personnages</h1>
<input 
    className='searchbar-input' 
    type='text' 
    placeholder="Recherche par nom. Ex: Wolverine"
    onChange={event => setTerm(event.target.value)}
    value={term}/>
<div className='page'>
<button    className='page+'  onClick={() =>setSkip(skip+100) || setPages((pages+1)) } style ={{display: (pages > ((data.count/100)-1))? "none" : ""    }}  >+</button>
<button className='page' style ={{display:"" }}>page</button>
<button     className='page-' onClick={() => setSkip(skip-100) || setPages((pages-1))} style ={{display: (pages < 1)? "none" : ""    }}>-</button>
</div>

<div className="ficheNiv2">

        {data.results.map((item, index, index2) => {
  
          const keys = Object.keys(item.thumbnail)
          return ( 
          <div className="principal">

<FontAwesomeIcon 
className="fav"

style={{color: Cookies.get(item._id)?"yellow":""}}
onClick={() => {
  handleCheckbox(index,item._id, pages, item.name);
}}
icon=" fa-solid  fa-star " />
  <div key={item._id}>

              </div> 
         
            <Link className="linkk" to={`/characters/${item._id}`} key={index}>
          <div className="ficheNiv3">
            <div className="ficheNiv4">
            <div className="ficheNiv5" key={index}>
              <img   src={`${item.thumbnail[keys[0]]}.${item.thumbnail[keys[1]]}`} alt="" />
  
            </div>
          
         <div className="ficheNiv6">     
              <h2> {item.name}</h2>    
            <p>{item.description}</p> 
        </div> 
        </div>
        </div> 
        </Link>   
                 </div>
          )
        })}
      </div>
      <div>
</div> 
</div> 

  )
}     
           

export default Characters;



