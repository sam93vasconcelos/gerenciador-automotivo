function ShowVehicle(props) {
  const { id } = props.match.params

  return (
    <h1>Show veículo id { id }</h1>
  )
}

export default ShowVehicle