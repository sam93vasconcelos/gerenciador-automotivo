import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ReactLoading from 'react-loading';
import http from '../../services/http';

import './styles.scss';

import Vehicle from '../../components/vehicle/Index'

function Home() {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [plate, setPlate] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = 'Gerenciador Automotivo | Adicionar Veículo';
  })

  function validate() {
    let isValid = true;

    if(!name) {
      document.getElementById('name').classList.add('validation-fail');
      isValid = false;
    }

    if(!year) {
      document.getElementById('year').classList.add('validation-fail');
      isValid = false;
    }

    if(!plate) {
      document.getElementById('plate').classList.add('validation-fail');
      isValid = false;
    }

    return isValid;
  }

  function handleWarning(target, status) {
    let field = document.getElementById(target);

    if(status === true) {
      field.classList.add('validation-fail');
    } else {
      field.classList.remove('validation-fail');
    }
  }

  function handleNameInput(event) {
    if(event.target.value.length > 0) {
      handleWarning('name', false)
    } else {
      handleWarning('name', true)
    }

    setName(event.target.value)
  }

  function handleYearInput(event) {
    if(event.target.value.length > 0) {
      handleWarning('year', false)
    } else {
      handleWarning('year', true)
    }

    setYear(event.target.value)
  }

  function handlePlateInput(event) {
    if(event.target.value.length > 0) {
      handleWarning('plate', false)
    } else {
      handleWarning('plate', true)
    }

    setPlate(event.target.value)
  }

  async function saveVehicle(event) {
    event.preventDefault();

    if(!validate()) {
      return
    }

    setSaving(true)

    try {
      await http.post('vehicles', { name, year, plate })
      toast.success('Veículo salvo')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao salvar veículo')
    }

    setSaving(false)
  }

  return (
    <div className="container">
      <h1 className="text-center">Adicionar Veículo</h1>

      <Link to="/" className="btn btn-red">Voltar</Link>

      <hr />

      <form onSubmit={ saveVehicle }>
        <h2>Novo Veículo</h2>
        <section className="inputs">        
          <input 
            autoFocus 
            type="text" 
            placeholder="Nome" 
            value={ name }
            onChange={ handleNameInput }
            id="name"
          />
          <input 
            type="text" 
            placeholder="Ano" 
            value={ year }
            onChange={ handleYearInput }
            id="year"
          />
          <input 
            type="text" 
            placeholder="Placa" 
            value={ plate }
            onChange={ handlePlateInput }
            id="plate"
          />

        </section>
        
        {
          saving ? (
            <ReactLoading type={'bubbles'} />
          ) : (
            <section className="buttons">
              <button 
                className="btn btn-green"
              >
                Salvar
              </button>
              <Link to="/" className="btn btn-red">Cancelar</Link>
            </section>
          )
        }

      </form>

      { name || year || plate ? 
        (
          <>
            <hr />
            <Vehicle 
              name={ name }
              year={ year }
              plate={ plate }
            />
          </>
        )
      : '' }
    </div>
  );
}

export default Home;
