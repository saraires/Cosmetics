import React from 'react';
import axios from "../axios/axios";
import { Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import * as $ from 'jquery';
import Menu from './menu';

export default function RealizarCompra() {

    const [productodb, setProductodb] = useState([]);
    const [id_Producto, setId_producto] = useState();
    const [precio, setPrecio] = useState();
    const [cantidad, setCantidad] = useState([]);
    const [nombre, setNombre] = useState();
    const [todosLosProductos] = useState([]);
    const [numOrden, setNumOrden] = useState([]);
    const [subtotalTodosLosProductos, setSubtotalTodosLosProductos] = useState();
    const [iva, setIVA] = useState();
    const [totalCompra, setTotalCompra] = useState();

    const today = new Date();
    const date =  `${today.getFullYear()}/${(today.getMonth() + 1)}/${today.getDate()}`;

    let subtotal = cantidad && precio > 0 ? cantidad * precio : 0;

    let numero = 0;

    const suma = function () {
        for (let i = 0; i < todosLosProductos.length; i++) {
            numero += todosLosProductos[i].subtotal;
        }
        setearValores();
    }

    function setearValores() {
        setSubtotalTodosLosProductos(numero);
        let calculoiva = numero * 0.19
        setIVA(calculoiva);
        setTotalCompra(numero + calculoiva);
    }

    // Peticion para traer los productos de la bd
    useEffect(() => {
        axios.get(`/productos`)
            .then((res) => {
                setProductodb(res.data);
            });
    }, []);

    // Boton de traer el numero de orden
    useEffect(() => {
        try {
            axios.get(`/orden`)
                .then((res) => {
                    setNumOrden(res.data);
                })
        } catch (error) {
            console.log(error.message)
        }
    }, []);

    const orden = numOrden.length + 1

    // Boton de agregar orden
    const agregarOrden = () => {
        axios.post(`/agregarOrden`, {
            id_Orden: orden,
            nombre: nombre,
            subtotal: subtotalTodosLosProductos,
            iva: iva,
            total: totalCompra,
            fecha: date,
            numeroProductos: cuantosProductosHay
        })
        window.location = `/realizarCompra`;
    };

    const actualizarTodosLosProductos = () => {
        try {
            todosLosProductos.push({
                id_Orden: orden,
                nombre: nombre,
                fecha: date,
                cantidad: cantidad,
                subtotal: subtotal,
                id_Producto: id_Producto
            });
            $('#clear2').val(0);
            setId_producto(0);
            setPrecio('');
            setNombre('');
            document.getElementById("clear").reset();
        } catch (error) {
            console.log(error)
        }

    }

    let cuantosProductosHay = 0;

    const cuantosProductos = function () {
        for (let i = 0; i < todosLosProductos.length; i++) {
            cuantosProductosHay += 1;
        }
    }

    return (
        <div>
            <Menu />
            <br />
            <h1 className="container">Compras</h1>
            <form id="clear">
                <div className="container card" style={{ marginTop: "15px" }}>
                    <div className="mb-3" style={{ marginTop: "15px" }}>
                        <label className="form-label">Numero de orden</label>
                        <input type="number" className="form-control" disabled id="exampleFormControlInput1" value={orden} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="exampleFormControlTextarea1" defaultValue="nombre" rows="3"></input>
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
                        <input className="form-control" rows="3" type="number" min="0" onChange={(e) => { e.target.value = !!e.target.value && Math.abs(e.target.value) >= 0 ? Math.abs(e.target.value) : null; setCantidad(e.target.value); }}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Subtotal</label>
                        <input type="text" disabled className="form-control" rows="3" id="clear2" value={subtotal}></input>
                    </div>
                    <button type="button" className="btn btn-success" onClick={() => { actualizarTodosLosProductos(); suma(); }}> Agregar productos</button>
                    <br />
                </div>
            </form>
            <br />
            <h1 className="container">Detalle de la orden</h1>
            <br />
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

                        <tbody id="tabla2" className="text-center table-bordered" >
                            {todosLosProductos.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td width="10%">{item.nombre}</td>
                                        <td width="10%">{item.cantidad}</td>
                                        <td width="10%">{item.subtotal}</td>
                                        <td width="10%">
                                            <button type="button" className="btn btn-danger" onClick={() => {
                                                const isLargeNumber = (element) => element.id_Producto === item.id_Producto;
                                                todosLosProductos.splice(todosLosProductos.findIndex(isLargeNumber), 1);
                                            }}>
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>
                    <br />
                    <Table
                        striped
                        hover
                        className="container table-responsive"
                        style={{ width: "100%", display: "block", margin: "auto" }}
                    >
                        <thead className="text-info text-center table-bordered">
                            <tr className="table-info">
                                <th scope="col">Subtotal</th>
                                <th scope="col">IVA 19%</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody className="text-center table-bordered" >
                            {
                                <tr>
                                    <td id="subtotal_producto">{subtotalTodosLosProductos}</td>
                                    <td>{iva}</td>
                                    <td>{totalCompra}</td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                    <br />
                    <button type="button" className="container btn btn-success " style={{ margin: "auto" }} onClick={() => { cuantosProductos(); agregarOrden()}}> Hacer pedido </button>
                    <br />
                    <br />
                </Container>
            </div>

        </div >

    )
}