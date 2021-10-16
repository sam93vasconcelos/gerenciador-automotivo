import React, { useState } from "react";
import toast from "react-hot-toast";
import http from '../../services/http';
import { removeComma } from "../../services/utilities";

import "./styles.scss";

function EditSupply({ supply, getVehicle, closeModal }) {
  const [km, setKm] = useState(supply?.km);
  const [price, setPrice] = useState(supply?.price);
  const [liters, setLiters] = useState(supply?.liters);
  const [total, setTotal] = useState(supply?.total);
  const [date, setDate] = useState(supply?.date);

  async function saveSupply(e) {
    e.preventDefault();

    try {
      await http.put(`supplies/${supply.id}`, {
        km,
        price,
        liters,
        total,
        date,
        vehicle_id: supply.vehicle_id
      });
      toast.success('Salvo!');
      getVehicle();
      closeModal();
    } catch (error) {
      toast.error('Erro ao salvar');
    }
  }

  function handlePriceChange(e) {
    let { value } = e.target;
    setPrice(value);
    
    let result = removeComma(liters) * removeComma(value);
    setTotal(result.toFixed(2));
  }

  function handleLitersChange(e) {
    let { value } = e.target;
    setLiters(value);
    
    let result = removeComma(price) * removeComma(value);
    setTotal(result.toFixed(2));
  }

  return (
    <div id="supply-container" className="edit-supply-container">
      <div>
        <h3>Editar abastecimento</h3>

        <form onSubmit={ saveSupply }>
          <label htmlFor="km">KM</label>
          <input
            required
            id="km"
            type="text" 
            placeholder="KM"
            value={km}
            onChange={ (e) => setKm(e.target.value) }
          />
          <label htmlFor="price">Preço Litro</label>
          <input
            required
            id="price"
            type="text" 
            placeholder="Preço Litro"
            value={price}
            onChange={ handlePriceChange }
          />
          <label htmlFor="liters">Litros</label>
          <input
            required
            id="liters"
            type="text" 
            placeholder="Litros"
            value={liters}
            onChange={ handleLitersChange }
          />
          <label htmlFor="total">Total</label>
          <input
            required
            id="total"
            type="text" 
            placeholder="Total"
            value={total}
            onChange={ (e) => setTotal(e.target.value) }
          />
          <label htmlFor="date">Data</label>
          <input
            required
            id="date"
            type="date" 
            placeholder="Date"
            value={date}
            onChange={ (e) => setDate(e.target.value) }
          />

          <button type="submit" className="btn btn-green">Salvar</button>
          <button onClick={ closeModal } type="button" className="btn btn-red">
            Cancelar
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditSupply;
