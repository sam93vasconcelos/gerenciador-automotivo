import { useEffect } from 'react';
import VehicleList from './ListVehicles/Index';

function Home() {
  useEffect(() => {
    document.title = 'Gerenciador Automotivo | Home';
  })

  return (
    <div className="container">
      <h1 className="text-center">Gerenciador Automotivo</h1>

      <VehicleList />
    </div>
  );
}

export default Home;
