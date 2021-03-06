import { Router, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import history from "./services/history";

import LogoutButton from "./components/logoutButton/Index";
import "./app.scss";

import Home from "./pages/Home";
import Login from "./pages/Login/Index.js";
import SignUp from "./pages/SignUp/Index.js";
import NewVehicle from "./pages/NewVehicle/NewVehicle";
import ShowVehicle from "./pages/ShowVehicle/Index";
import LoadingContext from './contexts/LoadingContext';
import GlobalLoading from "./components/GlobalLoading/Index";
import Reset from "./pages/ResetPassword/Index";
import Email from "./pages/ResetPassword/RequestEmail";

function App() {
  return (
    <>
      <Toaster />
      <LogoutButton />
      <LoadingContext>
        <GlobalLoading />
        <Router history={history}>
          <Switch>
            <Route component={Home} path="/" exact />
            <Route component={Login} path="/login" />
            <Route component={SignUp} path="/sign-up" />
            <Route component={NewVehicle} path="/novo-veiculo" />
            <Route component={ShowVehicle} path="/detalhes-veiculo/:id" />
            <Route component={Reset} path="/reset/:token/:email" />
            <Route component={Email} path="/email" />
          </Switch>
        </Router>
      </LoadingContext>
    </>
  );
}

export default App;
