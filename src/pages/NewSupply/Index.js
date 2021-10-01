import React from "react";
import "./styles.scss";

function NewSupply({ fn }) {
  fn.handleAddSupply = () => {
    document.getElementById("supply-container").classList.add("show-container");
  };

  function handleCancelSupply() {
    document
      .getElementById("supply-container")
      .classList.remove("show-container");
  }

  return (
    <div id="supply-container" className="new-supply-container">
      <div>
        <h3>Adicionar abastecimento</h3>

        <input type="text" placeholder="KM" />
        <input type="text" placeholder="Preço Litro/m³" />
        <input type="text" placeholder="Litros/m³" />
        <input type="text" placeholder="Total" />
        <select defaultValue="0">
          <option value="0" disabled>
            Selecione
          </option>
          <option value="1">Gasolina</option>
          <option value="2">Etanol</option>
          <option value="3">GNV</option>
          <option value="4">Diesel</option>
        </select>

        <button className="btn btn-green">Salvar</button>
        <button onClick={handleCancelSupply} className="btn btn-red">
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default NewSupply;
