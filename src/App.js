import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';

import './app.scss';
import NewVehicle from './pages/NewVehicle/NewVehicle';

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Switch>
          <Route component={ Home } path="/" exact />
          <Route component={ NewVehicle } path="/novo-veiculo" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
