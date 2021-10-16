import React, { useState } from "react";
import toast from "react-hot-toast";
import http from '../../services/http';
import { removeComma } from '../../services/utilities';

import "./styles.scss";
import useLoading from '../../hooks/useLoading';

function NewSupply({ fn, addSupplyToArray, vehicle_id }) {
  const [km, setKm] = useState('');
  const [price, setPrice] = useState('');
  const [liters, setLiters] = useState('');
  const [total, setTotal] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const { setLoading } = useLoading();

  fn.handleAddSupply = () => {
    document.getElementById("supply-container").classList.add("show-container");
  };

  function handleHideSupply() {
    document
      .getElementById("supply-container")
      .classList.remove("show-container");

    setKm('');
    setPrice('');
    setLiters('');
    setTotal('');
  }

  async function saveSupply(e) {
    e.preventDefault();

    setLoading(true);
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
      handleHideSupply();
    } catch (error) {
      if(error.response.status === 422) {
        Object.values(error.response.data.errors).forEach(err => {
          toast.error(err);
        });
      } else {
        toast.error('Erro ao salvar');
      }
    }
    setLoading(false);
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
    <div id="supply-container" className="new-supply-container">
      <div>
        <h3>Adicionar abastecimento</h3>

        <form onSubmit={ saveSupply }>

          <input 
            required
            type="text" 
            placeholder="KM"
            value={km}
            onChange={ (e) => setKm(e.target.value) }
          />
          <input 
            required
            type="text" 
            placeholder="Preço Litro"
            value={price}
            onChange={ handlePriceChange }
          />
          <input 
            required
            type="text" 
            placeholder="Litros"
            value={liters}
            onChange={ handleLitersChange }
          />
          <input 
            required
            type="text" 
            placeholder="Total"
            value={total}
            onChange={ (e) => setTotal(e.target.value) }
          />
          <input 
            required
            type="date" 
            placeholder="Date"
            value={date}
            onChange={ (e) => setDate(e.target.value) }
          />

          <button type="submit" className="btn btn-green">Salvar</button>
          <button type="button" onClick={handleHideSupply} className="btn btn-red">
            Cancelar
          </button>

        </form>
      </div>
    </div>
  );
}

export default NewSupply;
