import React from 'react';
import axios from "../axios/axios";
import { useState, useEffect } from "react";
import { getFromLocal, saveToLocal } from '../functions/localstorage';
import Menu from './menu';

export default function RealizarCompra() {

    const [producto, setProducto] = useState([]);
    const [cantidad, setCantidad] = useState([]);

    const today = new Date();
    const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

    useEffect(() => {
        axios.get(`/productos`)
            .then((res) => {
                setProducto(res.data);
            });
    }, []);

    // const deleteNota = (id_nota) => {
    //     try {
    //         axios
    //             .delete(`/eliminarNota/${id_nota}`);
    //         console.log(id_nota)
    //         setNotas(notas.filter(notas => notas._id !== id_nota));
    //         window.location = `/inicio/${id}`
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    return (
        <div>
            <Menu />
            <div className="container card" style={{ marginTop: "15px" }}>
                <div className="mb-3" style={{ marginTop: "15px" }}>
                    <label className="form-label">Numero de orden</label>
                    <input type="number" className="form-control" disabled id="exampleFormControlInput1" placeholder="Me traigo la info" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="exampleFormControlTextarea1" rows="3"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <input type="number" className="form-control" disabled id="exampleFormControlTextarea1" placeholder={date} rows="3"></input>
                </div>

                <div class="dropdown">
                    <button
                        class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown button
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">
                            Action
                        </a>
                        <a class="dropdown-item" href="#">
                            Another action
                        </a>
                        <a class="dropdown-item" href="#">
                            Something else here
                        </a>
                    </div>
                </div>

                <div>
                    {
                        producto.map((producto, index) => {
                            return (

                                <div className="form-check" key={index}>
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" onClick={() => saveToLocal("id_producto", producto.id_Producto)} />
                                    <label className="form-check-label" for="flexRadioDefault1">{producto.nombre}</label>
                                </div>
                            )
                        })
                    }
                </div>
                <br />
                <div className="mb-3">
                    <label className="form-label">Cantidad del producto</label>
                    <input type="number" className="form-control" rows="3"></input>
                </div>
            </div>
        </div >

    )
}