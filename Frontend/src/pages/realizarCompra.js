import React from 'react';
import axios from "../axios/axios";
import { Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getFromLocal, saveToLocal } from '../functions/localstorage';
import Menu from './menu';

export default function RealizarCompra() {

    const [producto, setProducto] = useState([]);
    const [id_Producto, setId_producto] = useState();
    const [precio, setPrecio] = useState();
    const [cantidad, setCantidad] = useState([]);

    let subtotal = cantidad * precio;

    const today = new Date();
    const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

    useEffect(() => {
        axios.get(`/productos`)
            .then((res) => {
                setProducto(res.data);
            });
    }, []);

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
                        console.log((array));
                        setId_producto(array[0]);
                        setPrecio(array[1]);
                    }}>
                        <option value="0">Selecciona un producto</option>
                        {
                            producto.map((producto, index) => {
                                return (
                                    <option value={[producto.id_Producto, producto.precio]} className="dropdown-item" key={index}>
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
                    <input type="text" disabled className="form-control" rows="3" defaultValue="0" placeholder={subtotal}></input>
                </div>
                <button type="button" class="btn btn-success">Agregar productos</button>
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
                            <th scope="col">Codigo Grupo</th>
                            <th scope="col">Descripción Grupo</th>
                            <th scope="col">Jornada</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className="text-center table-bordered">
                        {/* {grupos.map((item, index) => {
                            console.log(item.id_grupo)
                            return (
                                <tr key={`${index - item.id}`}>
                                    <td width="10%">{item.cod_grupo}</td>
                                    <td width="10%">{item.descripcion}</td>
                                    <td width="10%">{item.jornada}</td>
                                    <td width="10%">
                                        <EditarGrupo grupo={item} />{" "}
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => deleteGrupo(item.id_grupo)}
                                        >
                                            Eliminar
                  </button>
                                    </td>
                                </tr>)
                        })} */}
                    </tbody>
                </Table>
            </div>

        </div >

    )
}