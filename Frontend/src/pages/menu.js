import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../images/Logo.png'

export default function inicio() {
    return (
        <div>
            <div className="navbar navbar-expand-lg navbar-light bg-light shadow-lg">
                <div className="container-fluid">
                    <Link to={`/`}>
                        <img alt="..." src={Logo} className="navbar-brand pb-2" href="/#" width="90px" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/realizarCompra">Realizar Compra</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/totalCompras">Total Compras</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{ paddingLeft: "660px" }} aria-current="page" href="/#">Sarai Restrepo Rodríguez</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}