import { useState, useEffect } from 'react';
import http from '../../services/http';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NewSupply from '../NewSupply/Index';
import UpdateVehicle from '../UpdateVehicle/Index';
import ShowSupplies from '../ShowSupplies/Index';

import './styles.scss';
import toast from 'react-hot-toast';
import history from '../../services/history';
import useLoading from '../../hooks/useLoading';

function ShowVehicle(props) {
	const [ vehicle, setVehicle ] = useState();
	const [ supplies, setSupplies ] = useState([]);
	const { id } = props.match.params;
	const { setLoading } = useLoading();

	useEffect(() => {
		getVehicle()
	}, []);

	async function getVehicle() {
		setLoading(true);

		try {
			let { data } = await http.get(`/vehicles/${id}`);

			setVehicle(data);
			setSupplies(data.supplies);
		} catch (error) {
			console.log(error);
			toast.error('Erro ao carregar veículo');
		}

		setLoading(false);
	}

	const fn = {};

	function handleUpdatedVehicle(vehicle) {
    setVehicle(vehicle);
  }

	function addSupplyToArray(supply) {
		setSupplies([...supplies,supply]);
	}

	async function deleteVehicle() {
		if(window.confirm('Tem certeza que deseja excluir este veículo e todos os seus movimentos? Esta ação não pode ser desfeita')) {
			setLoading(true);
			try {
				await http.delete(`vehicles/${vehicle.id}`);
				toast.success('Removido!');
				history.push('/');
			} catch (error) {
				console.log(error);
				toast.error('Erro ao remover veículo');
			}
			setLoading(false);
		}
	}

	return (
		<div>
			<div className="container">
				<NewSupply addSupplyToArray={addSupplyToArray} vehicle_id={vehicle?.id} fn={fn} />

				<UpdateVehicle 
					handleUpdatedVehicle={ handleUpdatedVehicle } 
					fn={fn} 
					vehicle={ vehicle } 
				/>
				
				<h1 className="text-center vehicle-actions">
					<span>Detalhes |</span>
					<span>{vehicle?.name}</span>
					<FaPencilAlt
						size={25} 
						color="#dd5" 
						onClick={() => fn.handleShow(true)}
						className="cursor-pointer"
					/>
					<FaTrashAlt 
						size={25} 
						color="#d55" 
						onClick={deleteVehicle}
						className="cursor-pointer"
					/>
				</h1>

				<section className="show-vehicles-container">
					<span className="vehicle-detail">
						<strong>Ano:</strong> {vehicle?.year}
					</span>
					<span className="vehicle-detail">
						<strong>Placa:</strong> {vehicle?.plate}
					</span>
				</section>

				<Link to="/" className="btn btn-red">
					Voltar
				</Link>
				<span onClick={() => fn.handleAddSupply()} to={`/adicionar-abastecimento/${id}`} className="btn btn-green">
					<strong>+ Abastecimento</strong>
				</span>

				<hr />

				<ShowSupplies supplies={ supplies } getVehicle={ getVehicle } />
			</div>
		</div>
	);
}

export default ShowVehicle;
