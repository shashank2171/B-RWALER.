import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { cookies } from "../App";




let last = "";

export function removeTags(str) {
  if ((str===null) || (str===''))
      return "Not available";
  else
      str = str.toString();
        
  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace( /(<([^>]+)>)/ig, '');
}

// async function loaderVisible(k){
//   let lo = (document.getElementById('loader'));
//   if(k===true){
//     let d = document.createElement('div');
//     d.setAttribute('class','loader');
//     lo.appendChild(d);
//   }
//   else{
//     lo.innerHTML="";
//   }
// }



function SearchBar() {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [curr, setCurr] = useState("");
  const [res, setRes] = useState([]);

  window.addEventListener("pointerdown",(e)=>{
   
    setCurr(e.target.id);
  })
  
  
  useEffect(() => {
    
    const keyDownHandler = event => {
    

      if (event.key === 'Enter') {
        event.preventDefault();
       
        
        if(wordEntered!==''){
          document.getElementById('loader').setAttribute('style','visibility: visible;');
          document.getElementById('list').setAttribute('style','visibility: visible;');
          document.getElementById('started').setAttribute('style','visibility: hidden;');
          search();
        }
        
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  });

  useEffect(() => {
    
    console.log(curr, '- Has changed');
    if(curr!==null && curr.substring(0, 3)==='li_'){
      last = curr;
      getInfo();
    }
    else if(curr==="do_n"){

      if(cookies.get("TOKEN")!==""){
        record('history');
      }

      window.open('https://cloudflare-ipfs.com/ipfs/'+res.data[Number(last[3])].ipfs_cid.toLowerCase(), '_blank');
    

    }
    else if(curr==="wish"){
      if(cookies.get("TOKEN")===""){
        document.getElementById('war').innerHTML="Please login to use this feature.";
      }
      else{
        document.getElementById('war').innerHTML="Item added to wishlist.";
        record('wishlist');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[curr])

  const getInfo = async() => {
    let k = res.data[Number(curr[3])]
    console.log(k);

    // let s = k.identifier;
    // let i =0;
    // while(s[i++]<s.length && s[i]!==',');
    
    // s = s.substring(0,i);

    let img = document.getElementById('bookImg');
    img.src="";
    img.alt='Loading...'
    img.src=('http://libgen.is/covers/'+k.coverurl);

    let des = removeTags(k.descr);
    document.getElementById('descId').innerText = "TITLE: "+k.title+"\n\nAUTHOR: "+k.author+"\n\nLANGUAGE: "+k.language+"\n\nPUBLISHER:  "+k.publisher+"\n\nEXTENSION:  "+k.extension+"\n\nIDENTIFIER:  "+k.identifier+"\n\nFILE SIZE: "+(Number(k.filesize)/(1024*1024)).toFixed(2)+" MB\n\nDESCRIPTION: "+des;
    
    let lin = document.getElementById('lin');
    lin.innerHTML="";
    let don = document.createElement('button');
    don.setAttribute('id','do_n');
    don.setAttribute('class','download');
    

    let wish = document.createElement('button');
    wish.setAttribute('id','wish');
    let war = document.createElement('div');
    war.setAttribute('id','war');
    war.innerHTML="";

    lin.appendChild(don);
    lin.appendChild(wish);
    lin.append(war);
    document.getElementById('do_n').innerHTML="Download";
    document.getElementById('wish').innerHTML="Wishlist";
    
    document.getElementById('infor').setAttribute('style','visibility: visible;');
   
  
  }

  async function record(meth){
    let email = cookies.get('EMAIL');
    let k = res.data[Number(last[3])];
    const configuration = {
      method: "post",
      url: "http://localhost:3001/add",
      data: {
        email,
        k,
        meth,
      }
    };

    axios(configuration)
    .then((result)=>{
      console.log(result);
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  const search = async() => {
            let list = document.getElementById('list');
            list.innerHTML="";

            
            let query  = wordEntered;
           
    
            const configuration = {
                method: "post",
                url: "http://localhost:3001/search",
                data: {query}
            };
    
            axios(configuration)
            .then((result)=>{
                console.log(result.data); 
                setRes(result);
                let list = document.getElementById('list');
                document.getElementById('loader').setAttribute('style','visibility: hidden;');
                let i =0;
                
               
                  result.data.forEach((item)=>{
                    let li = document.createElement("li");
                    li.setAttribute('id',"li_"+i);
                    li.setAttribute('className', 'liItem');
                    i++;
                    li.innerText = item.title;
                    list.appendChild(li);
                  })
               
                

                setCurr('li_0');
            })
            .catch((e)=>{
                console.log(e);
                let li = document.createElement("li");
                li.setAttribute('id',"li_fail");
                li.setAttribute('className', 'liItem');
                li.innerHTML="SORRY! No books found. Try again with author's name..."
                list.appendChild(li);
            })
    }


  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(searchWord);
    }
  };

  const clearInput = () => {

    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Enter book or author's name here..."
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;