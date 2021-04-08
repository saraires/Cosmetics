import React from 'react';
import Menu from './menu';
import axios from "../axios/axios";
import { useEffect } from "react";
import imagenBonita from '../images/imagenBonita.png'

export default function Inicio(){

    // Llenar elemetos en la bd
    useEffect(() => {
        axios.get(`/cargar`);
    }, []);

    return(
        <div>
            <Menu/>
            <img alt="..." className="mt-1" style={{width: "100%"}} src={imagenBonita}/>
        </div>
    )
}