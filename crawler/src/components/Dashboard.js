import React from 'react'
import { cookies } from '../App';



export function Wishlist(){
  return(
    <div className="dashwish">
          
      <div id='wishli' className="wishli">
        </div>
          
          <div id='wishinfor' className="wishinfor">
              <div className="wishimage">
                <img id='wishbookImg' referrerPolicy="no-referrer" src="" alt=""/>
              </div>
              <div id='wishdescr' className="wishdescr">
                <div id='wishdescId'></div>
              </div>
              <div id="wishlin" className="wishlinks">
              </div>
          </div>
        </div>
  )
}

export function History(){
  return(
    <div className="dashhist">
          
      <div id='histli' className="histli">
        </div>
          
          <div id='histinfor' className="histinfor">
              <div className="histimage">
                <img id='histbookImg' referrerPolicy="no-referrer" src="" alt=""/>
              </div>
              <div id='histdescr' className="histdescr">
                <div id='histdescId'></div>
              </div>
              <div id="histlin" className="histlinks">
              </div>
          </div>
        </div>
  )
}
export default function Dashboard(){
    function logout(){
        cookies.set('TOKEN',"",{path:'/'});
        cookies.remove('NAME');
        localStorage.clear();
    }
  return (
    <div id='dash'>
        <div id='head'>
            <h3 id='user'>Welcome</h3>
            <button id='logout' onClick={logout}>Log Out</button>
        </div>
        <div id='cat'>
            <button id='History'>History</button>
            <div id='divide'></div>
            <button id='Wishlist'>Wishlist</button>
        </div>   
    </div>
  )
}






