import './styles.scss';

function Vehicle(props) {
  const { name, year, plate } = props;


  return (
    <div className="vehicle-card">
      <h3>{ name }</h3>
      <h4>{ year }</h4>
      <p>{ plate }</p>
    </div>
  )
}

export default Vehicle;