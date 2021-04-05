import React from 'react';
import axios from "../axios/axios";
import { useState, useEffect } from "react";
import Menu from './menu';

export default function RealizarCompra() {

    const [producto, setProducto] = useState([]);

    const today = new Date();
    const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

    useEffect(() => {
        axios.get(`/productos`)
            .then((res) => {
                console.log(res.data);
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
                    <label for="exampleFormControlInput1" className="form-label">Numero de orden</label>
                    <input type="number" className="form-control" disabled id="exampleFormControlInput1" placeholder="Me traigo la info" />
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="exampleFormControlTextarea1" rows="3"></input>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className="form-label">Fecha</label>
                    <input type="number" className="form-control" disabled id="exampleFormControlTextarea1" placeholder={date} rows="3"></input>
                </div>
                <div>
                    {
                        producto.map((producto, index) => {
                            console.log(producto.id_Producto)
                            return (
                                <ul key={`${index - producto.id_Producto}`}>
                                    <li width="10%">{producto.nombre}</li>
                                    <li width="10%">{producto.precio}</li>
                                    <li width="10%">{producto.cantidadDisponible}</li>
                                </ul>
                            )
                        })
                    }
                </div>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown button
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">Crema Facial</a></li>
                        <li><a class="dropdown-item" href="#">Mascarilla</a></li>
                        <li><a class="dropdown-item" href="#">Serum</a></li>
                        <li><a class="dropdown-item" href="#">Jabon Facial</a></li>
                        <li><a class="dropdown-item" href="#">Brocha maquillaje</a></li>
                        <li><a class="dropdown-item" href="#">Bloqueador Solar</a></li>
                        <li><a class="dropdown-item" href="#">Rubor</a></li>
                        <li><a class="dropdown-item" href="#">Pestañina</a></li>
                        <li><a class="dropdown-item" href="#">Pinta Uñas Azul</a></li>
                        <li><a class="dropdown-item" href="#">Brillo labial</a></li>
                    </ul>
                </div>

            </div>
        </div>
    )
}