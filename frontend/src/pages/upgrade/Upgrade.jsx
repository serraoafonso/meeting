import React from "react";
import Planos from "../../assets/imgs/canvas/1.png"
import Arrow from "../../assets/imgs/left.png"
import ArrowWhite from "../../assets/imgs/left.png"
import {Link} from 'react-router-dom'
import "./upgrade.css";

export default function Upgrade() {

  return (
    <div className='upgrade'>
      <div className="arrow">
        <Link to="/"><img src={Arrow} alt="" /></Link>
      </div>
      <img src={Planos} usemap='#image-map' id="imageMap"/>
      <map name='image-map'>
        <area
          target='_blank'
          alt='Subscribe'
          title='Subscribe'
          href='https://www.instagram.com/serrao.afonso'
          coords='79,857,549,958'
          shape='rect'
        />
        <area
          target='_blank'
          alt='Subscribe'
          title='Subscribe'
          href='https://www.instagram.com/serrao.afonso'
          coords='1359,850,1825,953'
          shape='rect'
        />
        <area
          target='_blank'
          alt='Subscribe'
          title='Subscribe'
          href='https://www.instagram.com/serrao.afonso'
          coords='745,860,1208,962'
          shape='rect'
        />
      </map>
    </div>
  );
}
