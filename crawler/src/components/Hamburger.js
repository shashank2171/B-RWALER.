/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import axios from "axios";

import Sign from "./Sign.js"; 


import {
  staggerReveal,
  handleCityReturn,
  handleCity,
  staggerRevealClose
} from "./Animations";

import Horror from "../images/dallas.jpg";
import Fiction from "../images/austin.jpg";
import newyork from "../images/newyork.jpg";
import sanfrancisco from "../images/sanfrancisco.png";
import beijing from "../images/beijing.jpg";
import { cookies } from "../App.js";
import Dashboard, { History, Wishlist } from "./Dashboard.js";
import { removeTags } from "./SearchBar.js";

const cities = [
  { name: "Horror", image: Horror },
  { name: "Fiction", image: Fiction },
  { name: "Humor", image: newyork },
  { name: "History", image: sanfrancisco },
  { name: "Adventure", image: beijing }
];


// function to render the login form of already signed up 
let last="";

const Hamburger = ({ state }) => {

  const [logIn, setLogin] = useState(true);
  const [wish, setWish] = useState(true);
  const [curr, setCurr] = useState("");
  const [resHist, setResHist] = useState([]);
  const [resWish, setResWish] = useState([]);
  // Create varibles of our dom nodes
  let menuLayer = useRef(null);
  let reveal1 = useRef(null);
  let reveal2 = useRef(null);
  let cityBackground = useRef(null);
  

  window.addEventListener("pointerdown",(e)=>{
    setCurr(e.target.id);
  })
  
  async function record(meth){
    let email = cookies.get('EMAIL');
    let k;
    if(meth==='wishlist'){
      k = resHist[Number(last[4])];
    }
    else{
      k = resWish[Number(last[4])];
    }
      
    const configuration = {
      method: "post",
      url: "https://brawler-server.onrender.com/add",
      data: {
        email,
        meth,
        k,
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

  const searchhist = async() => {
        
        let email  = cookies.get("EMAIL");
   
        const meth = 'read';
        const configuration = {
            method: "post",
            url: "https://brawler-server.onrender.com/add",
            data: {
              email,
              meth,
            }
        };

        axios(configuration)
        .then((result)=>{
            console.log(result.data[0].history); 
            setResHist(result.data[0].history);
            let list = document.getElementById('histli');
            list.setAttribute('style','visibility: visible;');
            list.innerHTML="";
            let i =1;
            if(resHist.length!==1){
              resHist.slice(1).forEach((item)=>{
                let li = document.createElement("li");
                li.setAttribute('id',"lih_"+i);
                li.setAttribute('className', 'liItem');
                i++;
                li.innerText = item.title;
                // let bt = document.createElement('button');
                // bt.innerHTML="x";
                // bt.setAttribute('id','removeh');
                // li.appendChild(bt);
                list.appendChild(li);
              })
            setCurr('lih_1');
            }
            else{
              let li = document.createElement("li");
              li.setAttribute('id',"li_fail");
              li.setAttribute('className', 'liItem');
              li.innerHTML="It's so empty here..."
              list.appendChild(li);
            }
        })
        .catch((e)=>{
            console.log(e);
        })

    }

    const searchwish = async() => {
        
      let email  = cookies.get("EMAIL");
      console.log(email);
      const meth = 'read';
      const configuration = {
          method: "post",
          url: "https://brawler-server.onrender.com/add",
          data: {
            email,
            meth,
          }
      };

      axios(configuration)
      .then((result)=>{
          console.log(result.data[0].wishlist); 
          setResWish(result.data[0].wishlist);
          let list = document.getElementById('wishli');
          list.setAttribute('style','visibility: visible;');
          list.innerHTML="";
          let i =1;
          
          if(resWish.length!==1){
            resWish.slice(1).forEach((item)=>{
              
              let li = document.createElement("li");
              li.setAttribute('id',"liw_"+i);
              li.setAttribute('className', 'liItems');
              i++;
              li.innerText = item.title;
              list.appendChild(li);
            })

            setCurr('liw_1');
          }
          else{
            let li = document.createElement("li");
              li.setAttribute('id',"li_fail");
              li.setAttribute('className', 'liItem');
              li.innerHTML="It's so empty here...";
              list.appendChild(li);
          }
            
      })
      .catch((e)=>{
          console.log(e);
      })

  }

    const getInfoHist = async() => {
      let k = resHist[Number(curr[4])];

  
  
      let img = document.getElementById('histbookImg');
      img.src="";
      img.alt='Loading...'
      img.src=('http://libgen.is/covers/'+k.coverurl);
  
      let des = removeTags(k.descr);
      document.getElementById('histdescId').innerText = "TITLE: "+k.title+"\n\nAUTHOR: "+k.author+"\n\nLANGUAGE: "+k.language+"\n\nPUBLISHER:  "+k.publisher+"\n\nEXTENSION:  "+k.extension+"\n\nIDENTIFIER:  "+k.identifier+"\n\nFILE SIZE: "+(Number(k.filesize)/(1024*1024)).toFixed(2)+" MB\n\nDESCRIPTION: "+des;
      
      let lin = document.getElementById('histlin');
      lin.innerHTML="";
      let don = document.createElement('button');
      don.setAttribute('id','doh_n');
      don.setAttribute('class','download');
      
  
      let wish = document.createElement('button');
      wish.setAttribute('id','wishh');
      let war = document.createElement('div');
      war.setAttribute('id','warh');
      war.innerHTML="";
  
      lin.appendChild(don);
      lin.appendChild(wish);
      lin.append(war);
      document.getElementById('doh_n').innerHTML="Download";
      document.getElementById('wishh').innerHTML="Wishlist";
      
      document.getElementById('histinfor').setAttribute('style','visibility: visible;');
     
    
    }

    const getInfoWish = async() => {
      let k = resWish[Number(curr[4])];

  
  
      let img = document.getElementById('wishbookImg');
      img.src="";
      img.alt='Loading...'
      img.src=('http://libgen.is/covers/'+k.coverurl);
  
      let des = removeTags(k.descr);
      document.getElementById('wishdescId').innerText = "TITLE: "+k.title+"\n\nAUTHOR: "+k.author+"\n\nLANGUAGE: "+k.language+"\n\nPUBLISHER:  "+k.publisher+"\n\nEXTENSION:  "+k.extension+"\n\nIDENTIFIER:  "+k.identifier+"\n\nFILE SIZE: "+(Number(k.filesize)/(1024*1024)).toFixed(2)+" MB\n\nDESCRIPTION: "+des;
      
      let lin = document.getElementById('wishlin');
      lin.innerHTML="";
      let don = document.createElement('button');
      don.setAttribute('id','dow_n');
      don.setAttribute('class','download');
      
  
      // let wish = document.createElement('button');
      // wish.setAttribute('id','wishw');
      // let war = document.createElement('div');
      // war.setAttribute('id','warw');
      // war.innerHTML="";
  
      lin.appendChild(don);
      // lin.appendChild(wish);
      // lin.append(war);
      document.getElementById('dow_n').innerHTML="Download";
      // document.getElementById('wishw').innerHTML="Wishlist";
      
      document.getElementById('wishinfor').setAttribute('style','visibility: visible;');
     
    
    }

  useEffect(() => {
    
    // If the menu is open and we click the menu button to close it.
    if (state.clicked === false) {
      // If menu is closed and we want to open it.

      staggerRevealClose(reveal2, reveal1);
      // Set menu to display none
      gsap.to(menuLayer, { duration: 1, css: { display: "none" } });
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      if(cookies.get("TOKEN")!==""){
        searchhist();
        searchwish();
      }
      
      // Set menu to display block
      gsap.to(menuLayer, { duration: 0, css: { display: "block" } });
      //Allow menu to have height of 100%
      gsap.to([reveal1, reveal2], {
        duration: 0,
        opacity: 1,
        height: "100%"
      });
      staggerReveal(reveal1, reveal2);
      // fadeInUp(info);
      //staggerText(line1, line2, line3);
    }
  }, [state]);


  useEffect(()=>{
    

    async function check(){
      const user = localStorage.getItem("email");
      
      if(user){
        cookies.set("TOKEN", localStorage.getItem('token'), {
          path: "/",
        });

        cookies.set("NAME", localStorage.getItem('name'),{
          path:"/",
        })

        cookies.set("EMAIL", localStorage.getItem('email'),{
          path:'/',
        })
    }}
    check();

    async function update(){
      if(cookies.get('TOKEN')!==''){
        if(wish===true){
          document.getElementById('Wishlist').setAttribute('style','background-color: antiquewhite; color:black');
          document.getElementById('History').setAttribute('style','background-color: transparent; color:antiquewhite');
        }
        else{
          document.getElementById('Wishlist').setAttribute('style','background-color: transparent; color:antiquewhite');
          document.getElementById('History').setAttribute('style','background-color: antiquewhite; color:black');
        }
      }
    }
   
    update();
   

  });

  useEffect(() => {
    console.log(curr, '- Has changed');
    if(curr!==null && curr==='Wishlist'){
      setWish(true);
      searchwish();
    }
    else if(curr==='History'){
      setWish(false);
      searchhist();
    }
    else if(curr.substring(0, 4)==='lih_'){
      getInfoHist();
      last=curr;
    }
    else if(curr.substring(0, 4)==='liw_'){
      getInfoWish();
      last=curr;
    }
    else if(curr==="doh_n"){
      window.open('https://cloudflare-ipfs.com/ipfs/'+resHist[Number(last[4])].ipfs_cid.toLowerCase(), '_blank');
    
    }
    else if(curr==="dow_n"){
      window.open('https://cloudflare-ipfs.com/ipfs/'+resWish[Number(last[4])].ipfs_cid.toLowerCase(), '_blank');
      record('history');
    }
    else if(curr==="wishh"){
      if(cookies.get("TOKEN")!==""){
        document.getElementById('warh').innerHTML="Item added to wishlist.";
        record('wishlist');
      }
    }
    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[curr])
  
  

  cookies.addChangeListener(async ()=>{
    if(cookies.get('TOKEN')!==""){
      setLogin(false);
      try{
        document.getElementById('user').innerHTML='Welcome '+cookies.get("NAME");
        document.getElementById('started').setAttribute('style','visibility: hidden');
      }
      catch{}
    }
    else{
      setLogin(true);
      
    }
  })

  return (
    
    <div ref={el => (menuLayer = el)} className='hamburger-menu'>
      <div
        ref={el => (reveal1 = el)}
        className='menu-secondary-background-color'>
        
      </div>
      <div ref={el => (reveal2 = el)} className='menu-layer'>
        <div
          ref={el => (cityBackground = el)}
          className='menu-city-background'></div>
         <div className='container'>
         <div className='wrapper'>

            

         { logIn && <div className='menu-links'>
            <nav>
                    
                 
                <Sign/>
                   
              </nav>


            

              <div  className='info'>
              <h3>How?</h3>
                <p>
                  Please create an account to enable history and wishlist. B-RAWLER. will get you your desired books.
                </p>
              </div>
              

            <div id="loc" className='locations'>
              Genre:
              {/* Returning the list of book types */}
              {cities.map(el => (
                <span
                  key={el.name}
                  onMouseEnter={() => handleCity(el.image, cityBackground)}
                  onMouseOut={() => handleCityReturn(cityBackground)}>
                  {el.name}
                </span>
              ))}
            </div>
            
          </div>}
          {!logIn && <Dashboard/>}
        </div> 
          
      </div> 
      {!logIn && wish && <Wishlist/>}      
      {!logIn && !wish && <History/>}
    </div>
  </div>
);};

export default Hamburger;
