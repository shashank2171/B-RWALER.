import React from "react";
import { Loading } from "./Loading";
import { Started } from "./Started";


export default function Cards() {
  return (
    <div className="cards">
      <Started/>
      <Loading/>
      <div id='list' className="list">
      </div>
      
      <div id='infor' className="infor">
          <div className="image">
            <img id='bookImg' referrerPolicy="no-referrer" src="" alt=""/>
          </div>
          <div id='descr' className="descr">
            <div id='descId'></div>
          </div>
          <div id="lin" className="links">
          </div>
      </div>
    </div>
  );
};