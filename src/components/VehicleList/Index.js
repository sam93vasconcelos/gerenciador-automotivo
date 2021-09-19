import { Link } from 'react-router-dom'

import './styles.scss'

import Vehicle from '../vehicle/Index'

function VehicleList() {
  return (
    <div>
      <Link to="/novo-veiculo" className="btn btn-green">Novo Veículo</Link>

      <hr />

      <h2>Seus Veículos</h2>

      <div className="vehicle-container">
        <Vehicle
          name="Sandero"
          year="2010/2011"
          plate="HTV-6568"
        />
      </div>
    </div>
  )
}

export default VehicleList