import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './app.scss';

import Home from './pages/Home';
import NewVehicle from './pages/NewVehicle/NewVehicle';
import ShowVehicle from './pages/ShowVehicle/Index';

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Switch>
          <Route component={ Home } path="/" exact />
          <Route component={ NewVehicle } path="/novo-veiculo" />
          <Route component={ ShowVehicle } path="/detalhes-veiculo/:id" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
