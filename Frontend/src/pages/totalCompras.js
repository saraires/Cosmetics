import React from 'react';
import axios from "../axios/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import Menu from './menu';

export default function TotalCompras() {

    const [orden, setOrden] = useState([]);

    useEffect(() => {
        axios.get(`/orden`)
            .then((res) => {
                setOrden(res.data);
            });
    }, []);

    console.log(orden);
    const transformer = (data) => {
        const fecha = data.split("T");
        return fecha[0];
    }

    console.log(orden);

    return (
        <div>
            <Menu />
            <br />
            <Container className="card shadow-lg col-md-8 mb-4">
                <br />
                <h1 className="container">Historial de compras</h1>
                <br />
                <Table id="tabla"
                    striped
                    hover
                    className="container table-responsive"
                    style={{ width: "100%", display: "block", margin: "auto" }}
                >
                    <thead className="text-info text-center table-bordered">
                        <tr className="table-info">
                            <th scope="col">Numero de orden</th>
                            <th scope="col">Fecha de compra</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col">IVA (19%)</th>
                            <th scope="col">Total pagado</th>
                            <th scope="col">Cantidad de productos</th>
                        </tr>
                    </thead>

                    <tbody className="text-center table-bordered" >
                        {orden.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td width="10%">{item.id_Orden}</td>
                                    <td width="10%">{transformer(item.fecha)}</td>
                                    <td width="10%">{item.subtotal}</td>
                                    <td width="10%">{item.iva}</td>
                                    <td width="10%">{item.total}</td>
                                    <td width="10%">{item.numeroProductos}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <br />
                <center>
                    <Link to={`/`} className="col-md-4 container">
                        <button type="button" href="/" className="btn btn-danger" > Volver al inicio</button>
                    </Link>
                </center>
                <br />
            </Container>
        </div>
    )
}