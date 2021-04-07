import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Inicio from './pages/inicio';
import RealizarCompra from './pages/realizarCompra';
import TotalCompras from './pages/totalCompras';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route exact path="/" render={(props) => <Inicio {...props} />} />
        <Route exact path="/realizarCompra" render={(props) => <RealizarCompra {...props} />} />
        <Route exact path="/totalCompras" render={(props) => <TotalCompras {...props} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
