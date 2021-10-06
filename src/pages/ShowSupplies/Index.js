import React from 'react';

import './styles.scss';

function ShowSupplies({supplies}) {
    return <>
    {supplies.length < 1 ? (
      <span className="without-details">🙁 Nenhum detalhe por enquanto</span>
    ) : (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>KM</th>
            <th>Preço Litro</th>
            <th>Litros</th>
            <th>Total</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          { supplies.map(supply => (
            <tr>
              <td>{ supply?.id }</td>
              <td>{ supply?.km }</td>
              <td>{ supply?.price }</td>
              <td>{ supply?.liters }</td>
              <td>{ supply?.total }</td>
              <td>{ supply?.date }</td>
            </tr>
          )) }
        </tbody>
      </table>
    )}
  </>;
}

export default ShowSupplies;