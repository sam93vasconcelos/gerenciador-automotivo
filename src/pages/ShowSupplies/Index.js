import React, { useState } from 'react';
import moment from 'moment';
import currency from 'currency.js';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import http from '../../services/http';

import Modal from 'react-modal';

import './styles.scss';
import toast from 'react-hot-toast';

function ShowSupplies(props) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      color: 'black',
      width: '80%',
      backgroundColor: 'white',
    },
  };
  Modal.setAppElement('#root');
  const [open, setOpen] = useState(true);
  const {supplies, getVehicle} = props;

  function media(supply, index) {
    let previousSupply = supplies[index - 1];
    let previousSupplyKm = previousSupply?.km ?? 0;
    let currentSupplyKm = supply?.km ?? 0;
    let currentSupplyLiters = supply?.liters ?? 0;
    
    return ((currentSupplyKm - previousSupplyKm) / currentSupplyLiters).toFixed(2);
  }

  async function handleDelete(event, id) {
    event.stopPropagation();

    if(window.confirm('Tem certeza que deseja excluir este abastecimento?')) {
      try {
        await http.delete(`supplies/${id}`)
        toast.success('Removido com sucesso');
        getVehicle();
      } catch (error) {
        toast.error('Erro ao remover');
      }
    }
  }

  function handleUpdate(event) {
    event.stopPropagation();

    setOpen(true);
  }

  return <>
      <Modal
        isOpen={open}
        onAfterOpen={() => {}}
        onRequestClose={() => {setOpen(false)}}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum facere cupiditate praesentium at earum eius rerum nulla vitae reiciendis ea? Aut dolorem fuga sequi dicta expedita eveniet nam iusto doloremque!
      </Modal>
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
                  onClick={(e) => handleDelete(e, supply?.id)}
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