import React from 'react';
import ReactDOM from "react-dom";
import axios from "../axios/axios";
import { Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import swal from "sweetalert2";
import * as $ from 'jquery';
import Menu from './menu';

export default function RealizarCompra() {

    const formSchema = Yup.object().shape({
        nombres: Yup.string().min(2, "¡Tu nombre es muy corto!").required("No puedes dejar este campo vacio"),
        productos: Yup.string().ensure().required("Escoge un producto"),
        cantidades: Yup.number(null || NaN || 0).required("¿Cuántos vas a llevar?"),
    });

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
    const date = `${today.getFullYear()}/${(today.getMonth() + 1)}/${today.getDate()}`;

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
        }).then(() => {
            swal.fire({
                title: "¡Todo Correcto!",
                text: "Tu pedido se realizo con exito!",
                icon: "success",
                confirmButtonText: "Ok",
            });
        }).catch((e) => {
            console.log(e);
            swal.fire({
                title: "Error!",
                text: "No pudimos realizar el pedido, intenta de nuevo más tarde",
                icon: "error",
                confirmButtonText: "Ok",
            });
        });
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

    const reloading = function (){
        ReactDOM.render(<tr />, document.getElementById('tabla2'));
        return;
    }

    return (
        <div>
            <Menu />
            <br />
            <Formik
                initialValues={{
                    nombres: 'gyugyug',
                    productos: '',
                    cantidades: '',
                }}
                validationSchema={formSchema}
                onSubmit={async (values) => {
                    // same shape as initial values
                    await new Promise((r) => setTimeout(r, 500));
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form id="clear">
                        <div className="container col-md-7 card shadow-lg m-auto" style={{ marginTop: "15px" }}>
                            <br />
                            <h1 className="container">Compras</h1>
                            <p className="container ml-2">Aquí puedes agregar todos los productos que quieras a tu orden</p>
                            <div className="mb-3 pr-4 pl-4">
                                <label className="form-label">Numero de orden</label>
                                <input type="number" className="form-control" disabled id="exampleFormControlInput1" value={orden} />
                            </div>
                            <div className="mb-3 pr-4 pl-4">
                                <label className="form-label">Nombre</label>
                                <Field type="text" name="nombres" className="form-control" id="exampleFormControlTextarea1" placeholder="Escribe aqui tu nombre" rows="3" />
                                {errors.nombres && touched.nombres ? (
                                    <div style={{ color: 'red' }}>{errors.nombres}</div>
                                ) : null}
                            </div>
                            <div className="mb-3 pr-4 pl-4">
                                <label className="form-label">Fecha</label>
                                <input type="number" className="form-control" disabled id="exampleFormControlTextarea1" placeholder={date} rows="3"></input>
                            </div>

                            <div className="mb-3 pr-4 pl-4">
                                <label className="form-label">Producto</label>
                                <select name="productos" className="form-select form-control" aria-label="Default select example" onChange={(e) => {
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
                                {errors.productos && touched.productos ? (
                                    <div style={{ color: 'red' }}>{errors.productos}</div>
                                ) : null}
                            </div>
                            {/* e.target.value = !!e.target.value && Math.abs(e.target.value) >= 0 ? Math.abs(e.target.value) : null; */}
                            {/* <div className="mb-3 pr-4 pl-4">
                                <label className="form-label">Cantidad del producto</label>
                                <Field type="text" className="form-control" name="cantidades" rows="3" onChange={(e) => { setCantidad(e.target.value); console.log(e.target.value) }} />
                                {errors.cantidades && touched.cantidades ? (
                                    <div style={{ color: 'red' }}>{errors.cantidades}</div>
                                ) : 0}
                            </div> */}
                            <div className="mb-3 pr-4 pl-4">
                                <label className="form-label">Nombre</label>
                                <Field type="number" name="cantidades" className="form-control" id="exampleFormControlTextarea1" placeholder="Escribe aqui tu nombre" rows="3" onChange={(e) => { setCantidad(e.target.value) }} />
                                {errors.cantidades && touched.cantidades ? (
                                    <div style={{ color: 'red' }}>{errors.cantidades}</div>
                                ) : null}
                            </div>
                            <div className="mb-3 pr-4 pl-4">
                                <label className="form-label">Subtotal</label>
                                <input type="text" disabled className="form-control" rows="3" id="clear2" value={subtotal}></input>
                            </div>
                            <br />
                            <center>
                                <button type="submit" className="btn btn-success col-md-3" onClick={() => { actualizarTodosLosProductos(); suma(); }}> Agregar productos</button>
                            </center>
                            <br />
                        </div>F
                    </Form>
                )}
            </Formik>


            <div>
                <br />
                <Container className="card shadow-lg col-md-7 mb-4" style={{justifyContent: "center", position: "relative", alignItems: "center"}}>
                    <br />
                    <h1 className="container">Detalle de la orden</h1>
                    <br />
                    <center>
                        <Table
                            striped
                            hover
                            responsive
                            className="container table-responsive"
                            style={{ width: "100%", display: "block", margin: "auto"}}
                        >
                            <thead className="text-center pl-auto pr-auto table-bordered">
                                <tr className="table-light-gray">
                                    <th width="200px" scope="col">Articulo</th>
                                    <th width="200px" scope="col">Cantidad</th>
                                    <th width="200px" scope="col">Subtotal</th>
                                    <th width="200px" scope="col">Borrar Item</th>
                                </tr>
                            </thead>

                            <tbody className="text-center table-bordered" >
                                {todosLosProductos.map((item, index) => {
                                    return (
                                        <tr key={index} id="tabla2">
                                            <td>{item.nombre}</td>
                                            <td>{item.cantidad}</td>
                                            <td>{item.subtotal}</td>
                                            <td>
                                                <button type="button" className="btn btn-danger" onClick={() => {
                                                    const isLargeNumber = (element) => element.id_Producto === item.id_Producto;
                                                    todosLosProductos.splice(todosLosProductos.findIndex(isLargeNumber), 1);
                                                    reloading();
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
                            style={{ width: "100%", display: "block", margin: "auto", paddingLeft: "7%" }}
                        >
                            <thead className="text-center table-bordered">
                                <tr className="table-ligth-gray">
                                    <th width="200px" scope="col">Subtotal</th>
                                    <th width="200px" scope="col">IVA 19%</th>
                                    <th width="200px" scope="col">Total</th>
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
                        <button type="button" className="container btn btn-success col-md-3" style={{ margin: "auto" }} onClick={() => { cuantosProductos(); agregarOrden() }}> Hacer pedido </button>
                        <br />
                        <br />
                    </center>
                </Container>
            </div>
        </div >

    )
}