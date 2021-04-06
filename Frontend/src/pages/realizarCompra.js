import React from 'react';
import axios from "../axios/axios";
import { Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import $ from 'jquery';
// import { getFromLocal, saveToLocal } from '../functions/localstorage';
import Menu from './menu';

export default function RealizarCompra() {

    const [productodb, setProductodb] = useState([]);
    const [id_Producto, setId_producto] = useState();
    const [precio, setPrecio] = useState();
    const [cantidad, setCantidad] = useState([]);
    const [nombre, setNombre] = useState();

    const [todosLosProductos, setTodosLosProductos] = useState([]);

    let subtotal = cantidad && precio > 0 ? cantidad * precio : 0;

    const inicio = 0;

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
            todosLosProductos.push({
                nombre: nombre,
                cantidad: cantidad,
                subtotal: subtotal,
                id_Producto: id_Producto
            });
            document.getElementById("clear").reset();
            $('#clear2').val(0);
            console.log(todosLosProductos);
        } catch (error) {
            console.log(error)
        }
    }

    const limpiarVariables = () => {
        subtotal = 0;
    }

    return (
        <div>
            <Menu />
            <br />
            <h1 className="container">Comprar</h1>
            <form id="clear">
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
                        <input type="number" className="form-control" rows="3" onChange={(e) => { setCantidad(e.target.value); }}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Subtotal</label>
                        <input type="text" disabled className="form-control" rows="3" id="clear2" value={subtotal}></input>
                    </div>
                    <button type="button" class="btn btn-success" onClick={() => { actualizarTodosLosProductos(); limpiarVariables() }}>Agregar productos</button>
                    <br />
                </div>
            </form>
            <br />
            <h1 className="container">Detalle de la orden</h1>
            <div>
                <Container>
                    <Table
                        striped
                        hover
                        className="container table-responsive"
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

                        <tbody className="text-center table-bordered" >
                            {todosLosProductos.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td width="10%">{item.nombre}</td>
                                        <td width="10%">{item.cantidad}</td>
                                        <td width="10%">{item.subtotal}</td>
                                        <td width="10%">
                                            <button type="button" className="btn btn-danger" onClick={() => {
                                                const isLargeNumber = (element) => element.id_Producto == item.id_Producto;
                                                todosLosProductos.splice(todosLosProductos.findIndex(isLargeNumber), 1);
                                                console.log(todosLosProductos);
                                            }}>
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Container>
            </div>

        </div >

    )
}