import { useState } from 'react';
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

  async function saveVehicle(event) {
    event.preventDefault();

    setSaving(true);

    try {
      await http.post('vehicles', { name, year, plate });
      toast.success('Veículo salvo');
    } catch (error) {
      toast.error('Erro ao salvar veículo');
    }

    setSaving(false)
  }

  return (
    <div className="container">
      <h1 className="text-center">Adicionar Veículo</h1>

      <Link to="/" className="btn btn-red">Voltar</Link>

      <hr />

      <form className="form-vehicle" onSubmit={ saveVehicle }>
        <h2>Novo Veículo</h2>
        <section className="inputs">
          <input
            required
            autoFocus
            type="text"
            placeholder="Nome"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
            id="name"
          />
          <input
            required
            type="text"
            placeholder="Ano"
            value={ year }
            onChange={ (e) => setYear(e.target.value) }
            id="year"
          />
          <input
            required
            type="text"
            placeholder="Placa"
            value={ plate }
            onChange={ (e) => setPlate(e.target.value) }
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
