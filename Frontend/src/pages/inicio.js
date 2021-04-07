import React from 'react';
import Menu from './menu';
import imagenBonita from '../images/imagenBonita.png'

export default function inicio(){
    return(
        <div>
            <Menu/>
            <img alt="..." className="mt-1" style={{width: "100%"}} src={imagenBonita}/>
        </div>
    )
}