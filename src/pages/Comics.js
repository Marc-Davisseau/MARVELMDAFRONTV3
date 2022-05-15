import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
const Comics = () => {
  

  const [tasks, setTasks] = useState([  ]);
  const handleCheckbox = (index, itemid, pages,itemtitle) => {
    console.log(pages)
    console.log("Index à modifier =>", (itemid));
    const token = itemid
    if(Cookies.get(token)){
      Cookies.remove(`${token}`);
    }
    else{
      Cookies.set(`${token}`, `T+${itemtitle}`,{ path: '/' });
    }
    
    setTasks(Cookies.get())
    console.log((tasks))
    console.log(Object.keys(tasks));
  }
  const [term, setTerm] = useState('');
  const [skip, setSkip] = useState(0)
  const [data, setData] = useState();
  const [pages, setPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {    console.log("fetdata en cours")
    const fetchData = async (req, res) => {

     

      const response = await axios.post(
        `https://marvelmdabackv3.herokuapp.com/comics`,
        //  "https://marvelbackmda.herokuapp.com/comics",
        // 'https://marvelbackmda.herokuapp.com/comics',
        {
          skip: skip,
          title: term,
          limit : 10
        }
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [skip,term]);
  return isLoading === true ? (
    <div className="chargement">En cours de chargement</div>
  ) : (
    // {if(termo){
    //   setTerm(termo)
      
    // }


    <div className="ficheNiv1"> 
  <h1 className="titlesection">Comics</h1>

<input 
    className='searchbar-input' 
    type='text' 
    placeholder="Recherche par titre. Ex: 1602"
    onChange={event => setTerm(event.target.value)}
    value={term}/>

<div className='page'>
<button    className='page+'  onClick={() =>setSkip(skip+100) || setPages((pages+1)) } style ={{display: (pages > ((data.count/100)-1))? "none" : ""    }}  >page +</button>
<button className='page' style ={{display:"" }}>page</button>
<button     className='page-' onClick={() => setSkip(skip-100) || setPages((pages-1))} style ={{display: (pages < 1)? "none" : ""    }}>page -</button>
</div>
<div className="ficheNiv2">

        {data.results.map((item, index, index2) => {
     
          const keys = Object.keys(item.thumbnail)
          return ( 

          
      

        
         <div className="ficheNiv3">

<FontAwesomeIcon 
className="fav"

style={{color: Cookies.get(item._id)?"yellow":""}}
onClick={() => {
  handleCheckbox(index,item._id, pages,item.title);
}}
icon="fa-solid fa-stack fa-star" />

         
          <div className="ficheNiv4">
            <div className="ficheNiv5Com" key={index}>
              <img   src={`${item.thumbnail[keys[0]]}.${item.thumbnail[keys[1]]}`} alt="" />
            </div>
          
         <div className="ficheNiv6">
            <p key={index}><h2>{item.title}</h2></p>
         
            <p key={index2}>{item.description}</p> 
        </div> 
        </div> 
        </div>
      
          )
        })}
      </div>
      <div>

</div> 

</div> 

   
  )}
export default Comics;
