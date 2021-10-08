import React, { useState } from "react";
import toast from "react-hot-toast";
import http from '../../services/http';

import "./styles.scss";

function NewSupply({ fn, addSupplyToArray, vehicle_id }) {
  const [km, setKm] = useState('');
  const [price, setPrice] = useState('');
  const [liters, setLiters] = useState('');
  const [total, setTotal] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));

  fn.handleAddSupply = () => {
    document.getElementById("supply-container").classList.add("show-container");
  };

  function handleCancelSupply() {
    document
      .getElementById("supply-container")
      .classList.remove("show-container");
  }

  async function saveSupply(e) {
    e.preventDefault();

    try {
      let { data } = await http.post('supplies', {
        km,
        price,
        liters,
        total,
        date,
        vehicle_id
      });
      toast.success('Salvo!');
      addSupplyToArray(data);
      handleCancelSupply();
    } catch (error) {
      console.log(error);
      toast.error('Erro ao salvar');
    }
  }

  return (
    <div id="supply-container" className="new-supply-container">
      <div>
        <h3>Adicionar abastecimento</h3>

        <form onSubmit={ saveSupply }>

          <input 
            type="text" 
            placeholder="KM"
            value={km}
            onChange={ (e) => setKm(e.target.value) }
          />
          <input 
            type="text" 
            placeholder="Preço Litro"
            value={price}
            onChange={ (e) => setPrice(e.target.value) }
          />
          <input 
            type="text" 
            placeholder="Litros"
            value={liters}
            onChange={ (e) => setLiters(e.target.value) }
          />
          <input 
            type="text" 
            placeholder="Total"
            value={total}
            onChange={ (e) => setTotal(e.target.value) }
          />
          <input 
            type="date" 
            placeholder="Date"
            value={date}
            onChange={ (e) => setDate(e.target.value) }
          />

          <button type="submit" className="btn btn-green">Salvar</button>
          <button type="button" onClick={handleCancelSupply} className="btn btn-red">
            Cancelar
          </button>

        </form>
      </div>
    </div>
  );
}

export default NewSupply;
