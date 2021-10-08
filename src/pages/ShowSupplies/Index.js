import React from 'react';
import moment from 'moment';
import currency from 'currency.js';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

import './styles.scss';

function ShowSupplies({supplies}) {

  function media(supply, index) {
    let previousSupply = supplies[index - 1];
    let previousSupplyKm = previousSupply?.km ?? 0;
    let currentSupplyKm = supply?.km ?? 0;
    let currentSupplyLiters = supply?.liters ?? 0;
    
    return ((currentSupplyKm - previousSupplyKm) / currentSupplyLiters).toFixed(2);
  }

  function handleDelete(event) {
    event.stopPropagation();

    alert('delete')
  }

  function handleUpdate(event) {
    event.stopPropagation();

    alert('update')
  }

  return <>
    {supplies.length < 1 ? (
      <span className="without-details">🙁 Nenhum detalhe por enquanto</span>
    ) : (
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>KM</th>
            <th>Preço Litro</th>
            <th>Litros</th>
            <th>Total</th>
            <th>Média</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          { supplies.map((supply, index) => (
            <tr className="cursor-pointer" onClick={handleUpdate} key={supply?.id}>
              <td>{ moment(supply?.date).format("DD/MM/YYYY") }</td>
              <td>{ supply?.km }</td>
              <td>{ currency(parseFloat(supply?.price), {
                symbol: "R$ ",
                separator: ".",
                decimal: ",",
                precision: 4
              }).format() }</td>
              <td>{ supply?.liters }</td>
              <td>{ currency(parseFloat(supply?.total), {
                symbol: "R$ ",
                separator: ".",
                decimal: ","
              }).format() }</td>
              <td>{`${media(supply, index)} km/l`}</td>
              <td>
                <FaPencilAlt 
                  className="mx-1 cursor-pointer"
                  color="#f9f956"
                  onClick={handleUpdate}
                />
                <FaTrashAlt 
                  className="mx-1 cursor-pointer"
                  color="#f95656"
                  onClick={handleDelete}
                />
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    )}
  </>;
}

export default ShowSupplies;