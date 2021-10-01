import { useState, useEffect } from "react";
import http from "../../services/http";
import { FaPencilAlt } from "react-icons/fa";
import LoadingOverlay from "../../components/loadingOverlay/Index";
import { Link } from "react-router-dom";
import NewSupply from "../NewSupply/Index";

import "./styles.scss";

function ShowVehicle(props) {
  const [vehicle, setVehicle] = useState();
  const { id } = props.match.params;

  useEffect(() => {
    getVehicle();
  }, []);

  async function getVehicle() {
    let { data } = await http.get(`/vehicles`);

    setVehicle(data[0]);
  }

  const fn = {};

  return (
    <>
      {vehicle ? "" : <LoadingOverlay />}
      <div className="container">
        <NewSupply fn={fn} />
        <h1 className="text-center">
          Detalhes | {vehicle?.name} <FaPencilAlt size={25} color="#dd5" />
        </h1>

        <section className="show-vehicles-container">
          <span className="vehicle-detail">
            <strong>Ano:</strong> {vehicle?.year}
          </span>
          <span className="vehicle-detail">
            <strong>Placa:</strong> {vehicle?.plate}
          </span>
        </section>

        <Link to="/" className="btn btn-red">
          Voltar
        </Link>
        <span
          onClick={() => fn.handleAddSupply()}
          to={`/adicionar-abastecimento/${id}`}
          className="btn btn-green"
        >
          + Abastecimento
        </span>
        <Link to="/" className="btn btn-blue">
          + Manutenção
        </Link>

        <hr />

        <span className="without-details">🙁 Nenhum detalhe por enquanto</span>
      </div>
    </>
  );
}

export default ShowVehicle;
