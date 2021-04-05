import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Inicio from './pages/inicio';
import realizarCompra from './pages/realizarCompra';
import totalCompras from './pages/totalCompras';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route exact path="/realizarCompra" component={realizarCompra} />
          <Route exact path="/totalCompras" component={totalCompras} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
