import './styles.scss';

function Vehicle(props) {
  const { id, name, year, plate, showVehicle } = props;


  return (
    <div onClick={ () => showVehicle(id) } className="vehicle-card">
      <h3>{ name }</h3>
      <h4>{ year }</h4>
      <p>{ plate }</p>
    </div>
  )
}

export default Vehicle;