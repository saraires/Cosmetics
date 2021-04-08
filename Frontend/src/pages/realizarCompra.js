import React from 'react';
import ReactDOM from "react-dom";
import axios from "../axios/axios";
import { Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import swal from "sweetalert2";
import * as $ from 'jquery';
import Menu from './menu';


export default function RealizarCompra() {

    // Validacion
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = function (data) {

        productodb.filter((x) => {
            return `${x.id_Producto}` === id_Producto;
        }).map(y => y.seleccionado = "si");

        if (subtotal === 0) {

            swal.fire({
                title: "Error!",
                text: "Asegurate de haber colocado tu nombre, el producto que quieres y la cantidad que vas a comprar",
                icon: "error",
                confirmButtonText: "Ok",
            });
        } else {
            actualizarTodosLosProductos();
            suma();
            swal.fire({
                title: "¡Todo Correcto!",
                text: "¡Hemos agregado tu producto a la orden de compra!",
                icon: "success",
                confirmButtonText: "Ok",
            });

        }
    };

    // Estados
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

    // Fecha
    const today = new Date();
    const date = `${today.getFullYear()}/${(today.getMonth() + 1)}/${today.getDate()}`;

    // sacar subtotal de un solo articulo
    let subtotal = cantidad && precio > 0 ? cantidad * precio : 0;

    // variable que recorre el for para sacar el subtotal de toda la orden
    let numero = 0;

    const suma = function () {
        for (let i = 0; i < todosLosProductos.length; i++) {
            numero += todosLosProductos[i].subtotal;
        }
        setearValores();
    }

    // definimos que valores tendran subtotal, iva y total
    function setearValores() {
        setSubtotalTodosLosProductos(numero);
        let calculoiva = numero * 0.19
        setIVA(calculoiva);
        setTotalCompra(numero + calculoiva);
    }

    // Llenar elemetos en la bd
    useEffect(() => {
        axios.get(`/cargar`);
    }, []);

    // Peticion para traer los productos de la bd
    useEffect(() => {
        axios.get(`/productos`)
            .then((res) => {
                res.data.map(data => data.seleccionado = "no");
                setProductodb(res.data);
            });
    }, []);


    // Boton de traer el numero de orden (id_Orden)
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

    // Numero de orden (nueva orden)
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
            window.location = `/realizarCompra`;
        }).catch((e) => {
            swal.fire({
                title: "Error!",
                text: "No pudimos realizar el pedido, intenta de nuevo más tarde",
                icon: "error",
                confirmButtonText: "Ok",
            });
        });
    };

    // actualizamos el array que contiene todos los productos selecionados con la nueva compra
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

            // Limpiamos el formulario
            $('#clear2').val(0);
            setId_producto(0);
            setPrecio('');
            setNombre('');
            document.getElementById("clear").reset();

        } catch (error) {
            console.log(error)
        }

    }

    // Variable que contara la cantidad de productos en el array
    let cuantosProductosHay = 0;

    const cuantosProductos = function () {
        for (let i = 0; i < todosLosProductos.length; i++) {
            cuantosProductosHay += 1;
        }
    }

    // Recargar la tabla de detalle de orden
    const reloading = function (id) {
        productodb.filter((x) => {
            return `${x.id_Producto}` === id;
        }).map(y => y.seleccionado = "no");
        ReactDOM.render(<tr />, document.getElementById('tabla2'));
        $('#clear3').load('realizarCompra.js');
    }

    // console.log(productodb);

    return (
        <div>
            <Menu />
            <br />
            <form id="clear" onSubmit={handleSubmit(onSubmit)}>
                <div className="container col-md-7 card shadow-lg m-auto" style={{ marginTop: "15px" }}>
                    <br />
                    <h1 className="container">Compras</h1>
                    <p className="container ml-2">Aquí puedes agregar todos los productos que quieras a tu orden</p>
                    <div className="mb-3 pr-4 pl-4">
                        <label className="form-label">Numero de orden</label>
                        <input type="number" className="form-control" disabled id="exampleFormControlInput1" value={orden} />
                    </div>
                    <div className="mb-3 pr-4 pl-4">
                        <label className="form-label">Nombre y apellidos</label>
                        <input className="form-control" type="text" {...register('nombres', { required: true, minLength: 2 })} placeholder="Escribe aqui tu nombre" />
                        {errors.nombres && errors.nombres.type === "required" && <p style={{ color: 'red' }}>No puedes dejar vacio este campo</p>}
                        {errors.nombres && errors.nombres.type === "minLength" && <p style={{ color: 'red' }}>¡Tu nombre es muy corto!</p>}
                    </div>
                    <div className="mb-3 pr-4 pl-4">
                        <label className="form-label">Fecha</label>
                        <input type="number" className="form-control" disabled placeholder={date}></input>
                    </div>

                    <div className="mb-3 pr-4 pl-4">
                        <label className="form-label">Producto</label>
                        <select className="form-select form-control" id="clear3" {...register("producto")} onChange={(e) => {
                            const array = e.target.value.split(",");
                            setId_producto(array[0]);
                            setPrecio(array[1]);
                            setNombre(array[2]);
                        }}>
                            <option value="0">Selecciona un producto</option>
                            {
                                productodb.filter(producto => producto.seleccionado === "no").map((producto, index) => {
                                    return (
                                        <option value={[producto.id_Producto, producto.precio, producto.nombre]} className="dropdown-item" key={index} >
                                            { producto.nombre}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-3 pr-4 pl-4">
                        <label className="form-label">Cantidad</label>
                        <input type="number" {...register("cantidades", { required: true, min: 1 })} className="form-control" placeholder="¿Cuántos vas a llevar?" onChange={(e) => { e.target.value = !!e.target.value && Math.abs(e.target.value) >= 0 ? Math.abs(e.target.value) : null; setCantidad(e.target.value); }} />
                        {errors.cantidades && errors.cantidades.type === "required" && <span style={{ color: 'red' }}>No puedes dejar vacio este campo</span>}
                        {errors.cantidades && errors.cantidades.type === "min" && <span style={{ color: 'red' }}>Ingresa una cantidad mayor a cero</span>}
                    </div>
                    <div className="mb-3 pr-4 pl-4">
                        <label className="form-label">Subtotal</label>
                        <input type="text" name="subtotal" disabled className="form-control" id="clear2" value={subtotal}></input>
                    </div>
                    <br />
                    <center>
                        <button type="submit" className="btn btn-success col-md-3"> Agregar productos</button>
                    </center>
                    <br />
                </div>
            </form>

            {/* ------------------------------------------------------------------------------------------------------------------ */}
            {/* ------------------------------------------------------------------------------------------------------------------ */}

            <div>
                <br />
                <Container className="card shadow-lg col-md-7 mb-4" style={{ justifyContent: "center", position: "relative", alignItems: "center" }}>
                    <br />
                    <h1 className="container">Detalle de la orden</h1>
                    <br />
                    <center>
                        <Table
                            striped
                            hover
                            responsive
                            className="container table-responsive"
                            style={{ width: "100%", display: "block", margin: "auto" }}
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
                                                    reloading(item.id_Producto);
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