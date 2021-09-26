import { Router, Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import history from './services/history'

import './app.scss';

import Home from './pages/Home';
import Login from './pages/Login/Index.jsx';
import NewVehicle from './pages/NewVehicle/NewVehicle';
import ShowVehicle from './pages/ShowVehicle/Index';

function App() {
  return (
    <>
      <Toaster />
      <Router history={ history }>
        <Switch>
          <Route component={ Home } path="/" exact />
          <Route component={ Login } path="/login" />
          <Route component={ NewVehicle } path="/novo-veiculo" />
          <Route component={ ShowVehicle } path="/detalhes-veiculo/:id" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
