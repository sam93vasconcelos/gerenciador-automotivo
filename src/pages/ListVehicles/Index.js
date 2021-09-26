import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import http from '../../services/http'
import { toast } from 'react-hot-toast'

import './styles.scss'

import Vehicle from '../../components/vehicle/Index'
import LoadingOverlay from '../../components/loadingOverlay/Index';

function VehicleList() {
  const history = useHistory()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getVehicles()
  }, [])

  async function getVehicles() {
    setLoading(true)
    try {
      let { data } = await http.get('vehicles')
      setVehicles(data)
    } catch (e) {
      // if(e.response.status === 401) {
      //   history.push('/login')
      // }
      console.log(e)
    }

    setLoading(false)
  }

  function showVehicle(id) {
    history.push(`/detalhes-veiculo/${id}`)
  }

  return (
    <div>
      { !loading ? '' : <LoadingOverlay /> }

      <Link to="/novo-veiculo" className="btn btn-green">Novo Veículo</Link>

      <hr />

      <h2>Seus Veículos</h2>

      <div className="vehicle-container">
        { vehicles.map(vehicle =>
          <Vehicle
            key={ vehicle.id }
            id={ vehicle.id }
            name={ vehicle.name }
            year={ vehicle.year }
            plate={ vehicle.plate }
            showVehicle={ showVehicle }
          />
        ) }
      </div>
    </div>
  )
}

export default VehicleList
