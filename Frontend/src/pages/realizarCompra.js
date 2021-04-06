import React from 'react';
import axios from "../axios/axios";
import { Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getFromLocal, saveToLocal } from '../functions/localstorage';
import Menu from './menu';

export default function RealizarCompra() {

    const [productodb, setProductodb] = useState([]);
    const [id_Producto, setId_producto] = useState();
    const [precio, setPrecio] = useState();
    const [cantidad, setCantidad] = useState([]);
    const [nombre, setNombre] = useState();

    const [todosLosProductos, setTodosLosProductos] = useState([]);

    let subtotal = cantidad * precio;

    let objetoProducto = {
        "nombre": nombre,
        "cantidad": cantidad,
        "subtotal": subtotal
    }


    const today = new Date();
    const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

    useEffect(() => {
        axios.get(`/productos`)
            .then((res) => {
                setProductodb(res.data);
            });
    }, []);

    const actualizarTodosLosProductos = () => {
        try {
            console.log(objetoProducto);
            todosLosProductos.push({ nombre: nombre });
            console.log(todosLosProductos);
        } catch (error) {
            console.log(error)
        }
    }

    console.log(todosLosProductos);

    return (
        <div>
            <Menu />
            <br />
            <h1 className="container">Comprar</h1>
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

                <div className="mb-3">
                    <label className="form-label">Producto</label>
                    <select className="form-select form-control" aria-label="Default select example" onChange={(e) => {
                        const array = e.target.value.split(",");
                        setId_producto(array[0]);
                        setPrecio(array[1]);
                        setNombre(array[2]);
                    }}>
                        <option value="0">Selecciona un producto</option>
                        {
                            productodb.map((producto, index) => {
                                return (
                                    <option value={[producto.id_Producto, producto.precio, producto.nombre]} className="dropdown-item" key={index}>
                                        {producto.nombre}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Cantidad del producto</label>
                    <input type="number" className="form-control" rows="3" onChange={(e) => { setCantidad(e.target.value); console.log(e.target.value); }}></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Subtotal</label>
                    <input type="text" disabled className="form-control" rows="3" placeholder={subtotal}></input>
                </div>
                <button type="button" class="btn btn-success" onClick={() => actualizarTodosLosProductos()}>Agregar productos</button>
                <br />
            </div>
            <br />
            <h1 className="container">Detalle de la orden</h1>
            <div>
                <Table
                    striped
                    hover
                    className="table-responsive"
                    style={{ width: "100%", display: "block", margin: "auto" }}
                >
                    <thead className="text-info text-center table-bordered">
                        <tr className="table-info">
                            <th scope="col">Articulo</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="container text-center table-bordered" >
                        {todosLosProductos.map((item, index) => {
                            console.log(item.id_Producto)
                            return (
                                <tr key={item.id}>
                                    <td width="10%">{item.nombre}</td>
                                    <td width="10%">{item.cantidad}</td>
                                    <td width="10%">{item.precio}</td>
                                    <td width="10%">
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>

        </div >

    )
}