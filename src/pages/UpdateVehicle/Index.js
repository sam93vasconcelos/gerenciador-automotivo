import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import ReactLoading from 'react-loading';
import http from '../../services/http';

import './styles.scss';

function UpdateVehicle({vehicle, fn, handleUpdatedVehicle}) {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [plate, setPlate] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(vehicle?.name ?? '');
    setYear(vehicle?.year ?? '');
    setPlate(vehicle?.plate ?? '');
  }, [vehicle])

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
      let { data } = await http.put(`vehicles/${vehicle?.id}`, { name, year, plate })
      handleUpdatedVehicle(data);
      fn.handleShow(false);
      toast.success('Veículo salvo')
    } catch (error) {
      toast.error('Erro ao salvar veículo')
    }

    setSaving(false)
  }

  fn.handleShow = (showing) => {
    let formDiv = document.getElementById('form-div')
    
    if(showing) {
      formDiv.classList.add('show');
    } else {
      formDiv.classList.remove('show');
    }
  }

  return (
    <div className="update-vehicle-card">
      <div id="form-div">
        <h3 className="text-center">Editar { vehicle?.name }</h3>

        <form onSubmit={ saveVehicle }>
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
                <button type="button" onClick={ () => fn.handleShow(false) } className="btn btn-red">Cancelar</button>
              </section>
            )
          }

        </form>
      </div>
    </div>
  );
}

export default UpdateVehicle;
