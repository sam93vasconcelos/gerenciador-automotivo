import { useState, useEffect } from 'react'
import http from '../../services/http'
import LoadingOverlay from '../../components/loadingOverlay/Index'
import { Link } from 'react-router-dom';

import './styles.scss'

function ShowVehicle(props) {
  const [vehicle, setVehicle] = useState()
  const { id } = props.match.params

  useEffect(() => {
    getVehicle()
  }, [])

  async function getVehicle() {
    let { data } = await http.get(`/vehicles`)

    setVehicle(data[0])
  }

  return (
    <>
      { vehicle ? '' : <LoadingOverlay /> }
      <div className="container">
        <h1 className="text-center">Detalhes | { vehicle?.name }</h1>

        <section className="show-vehicles-container">
          <span className="vehicle-detail">
            <strong>Ano:</strong> { vehicle?.year}
          </span>
          <span className="vehicle-detail">
            <strong>Placa:</strong> { vehicle?.plate}
          </span>
        </section>

        <Link to="/" className="btn btn-red">Voltar</Link>
        <Link to="/" className="btn btn-green">+ Abastecimento</Link>
        <Link to="/" className="btn btn-blue">+ Manutenção</Link>

        <hr />

        <span className="without-details">🙁 Nenhum detalhe por enquanto</span>

      </div>
    </>
  )
}

export default ShowVehicle