import React from 'react';
import Menu from './menu';
import imagenBonita from '../images/imagenBonita.jpg'

export default function inicio(){
    return(
        <div>
            <Menu/>
            <img alt="..." style={{width: "100%"}} src={imagenBonita}/>
        </div>
    )
}