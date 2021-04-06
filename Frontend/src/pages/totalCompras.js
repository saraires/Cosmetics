// import React, { useState } from 'react';
// import axios from "../axios/axios";
// import { Container, Table } from "react-bootstrap";

// export default function totalCompras() {

//     const [orden, setOrden] = useState();

//     useEffect(() => {
//         axios.get(`/productos`)
//             .then((res) => {
//                 setOrden(res.data);
//             });
//     }, []);

//     return (
//         <div>
//             <Container>
//                 <Table id="tabla"
//                     striped
//                     hover
//                     className="container table-responsive"
//                     style={{ width: "100%", display: "block", margin: "auto" }}
//                 >
//                     <thead className="text-info text-center table-bordered">
//                         <tr className="table-info">
//                             <th scope="col">Numero de orden</th>
//                             <th scope="col">Total</th>
//                             <th scope="col"># de Productos</th>
//                         </tr>
//                     </thead>

//                     <tbody className="text-center table-bordered" >
//                         <tr>
//                             <td width="10%">{id_Orden}</td>
//                             <td width="10%">{total}</td>
//                             <td width="10%">{productos}</td>
//                         </tr>
//                     </tbody>
//                 </Table>
//                 <br />
//             </Container>
//         </div>
//     )
// }