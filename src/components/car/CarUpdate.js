// src/pages/CarUpdate.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function CarUpdate() {
	const { id } = useParams(); // URL'den gelen ID'yi alıyoruz
	const [car, setCar] = useState(null);
	const [modelYear, setModelYear] = useState('');
	const [plate, setPlate] = useState('');
	const [dailyPrice, setDailyPrice] = useState('');
	const [state, setState] = useState('');
	const [models, setModels] = useState([]);
	const [selectedModelId, setSelectedModelId] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		// Mevcut arabayı API'den çekiyoruz
		axios.get(`http://localhost:8080/api/cars/${id}`)
			.then(response => {
				const carData = response.data;
				setCar(carData);
				setModelYear(carData.modelYear);
				setPlate(carData.plate);
				setDailyPrice(carData.dailyPrice);
				setState(carData.state);
				setSelectedModelId(carData.modelId);
			})
			.catch(error => {
				console.error("There was an error fetching the car!", error);
				setError('Error fetching car.');
			});

		// Modelleri API'den çekiyoruz
		axios.get('http://localhost:8080/api/models')
			.then(response => {
				setModels(response.data);
			})
			.catch(error => {
				console.error("There was an error fetching the models!", error);
				setError('Error fetching models.');
			});
	}, [id]);

	const handleUpdateCar = (event) => {
		event.preventDefault(); // Formun varsayılan davranışını engelle

		// Plate ve state string olduğu için trim edebiliriz
		const plateStr = String(plate).trim();
		const stateStr = String(state).trim();

		// Güncellenmiş alanlar için kontrol
		if (!modelYear || isNaN(modelYear)) {
			setError('Model year must be a valid number.');
			return;
		}

		if (!plateStr || !dailyPrice || isNaN(dailyPrice) || !stateStr) {
			setError('All fields are required.');
			return;
		}

		if (!selectedModelId) {
			setError('Please select a model.');
			return;
		}

		const updatedCar = {
			modelYear,
			plate,
			dailyPrice: parseFloat(dailyPrice),
			state,
			modelId: selectedModelId,
		};

		axios.put(`http://localhost:8080/api/cars/${id}`, updatedCar)
			.then(response => {
				setError('');
				navigate('/cars'); // Redirect to the car list page
			})
			.catch(error => {
				console.error("There was an error updating the car!", error);
				setError('Error updating car.');
			});
	};

	return (
		<div>
			<h4>Update Car</h4>
			{error && <p className="text-danger">{error}</p>}
			{car && (
				<Form onSubmit={handleUpdateCar}>
					<Form.Group className="mb-3">
						<Form.Label>Select Model</Form.Label>
						<Form.Control
							as="select"
							value={selectedModelId}
							onChange={(e) => setSelectedModelId(e.target.value)}
						>
							<option value="">Select a model</option>
							{models.map((model) => (
								<option key={model.id} value={model.id}>
									{model.name}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Model Year</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter model year"
							value={modelYear}
							onChange={(e) => setModelYear(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Plate</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter plate number"
							value={plate}
							onChange={(e) => setPlate(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Daily Price</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter daily price"
							value={dailyPrice}
							onChange={(e) => setDailyPrice(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>State</Form.Label>
						<Form.Control
							as="select"
							value={state}
							onChange={(e) => setState(e.target.value)}
						>
							<option value="">Select state</option>
							<option value="AVAILABLE">AVAILABLE</option>
							<option value="RENTED">RENTED</option>
							<option value="MAINTENANCE">MAINTENANCE</option>
						</Form.Control>
					</Form.Group>
					<Button variant="primary" type="submit" className="mt-2">Update Car</Button>
				</Form>
			)}
		</div>
	);
}

export default CarUpdate;