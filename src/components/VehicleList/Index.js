import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import http from '../../services/http'

import './styles.scss'

import Vehicle from '../vehicle/Index'

function VehicleList() {
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    getVehicles()
  }, [])

  async function getVehicles() {
    let { data } = await http.get('vehicles')

    setVehicles(data)
  }

  return (
    <div>
      <Link to="/novo-veiculo" className="btn btn-green">Novo Veículo</Link>

      <hr />

      <h2>Seus Veículos</h2>

      <div className="vehicle-container">
        { vehicles.map(vehicle => 
          <Vehicle
            key={ vehicle.id }
            name={ vehicle.name }
            year={ vehicle.year }
            plate={ vehicle.plate }
          />
        ) }
      </div>
    </div>
  )
}

export default VehicleList