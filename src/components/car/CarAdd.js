// src/pages/AddCar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CarAdd() {
	const [modelYear, setModelYear] = useState('');
	const [plate, setPlate] = useState('');
	const [dailyPrice, setDailyPrice] = useState('');
	const [state, setState] = useState('');
	const [models, setModels] = useState([]); // Burada 'cars' yerine 'models' kullanıldı.
	const [selectedModelId, setSelectedModelId] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		axios.get('http://localhost:8080/api/models') // Doğru endpoint
			.then(response => {
				setModels(response.data); // Modelleri setModels ile ayarlıyoruz
			})
			.catch(error => {
				console.error("There was an error fetching the models!", error);
				setError('Error fetching models.');
			});
	}, []);

	const handleAddCar = (event) => {
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

		const newCar = {
			modelYear,
			plate,
			dailyPrice: parseFloat(dailyPrice),
			state,
			modelId: selectedModelId,
		};

		axios.post('http://localhost:8080/api/cars', newCar) // Doğru endpoint
			.then(response => {
				setModelYear('');
				setPlate('');
				setDailyPrice('');
				setState('');
				setSelectedModelId('');
				setError('');
				navigate('/cars'); // Redirect to the car list page
			})
			.catch(error => {
				console.error("There was an error adding the car!", error);
				setError('Error adding car.');
			});
	};

	return (
		<div>
			<h4>Add New Car</h4>
			{error && <p className="text-danger">{error}</p>}
			<Form onSubmit={handleAddCar}>
				<Form.Group className="mb-3">
					<Form.Label>Select Model</Form.Label>
					<Form.Control
						as="select"
						value={selectedModelId}
						onChange={(e) => setSelectedModelId(e.target.value)}
					>
						<option value="">Select a model</option>
						{models.map((model) => ( // 'cars' yerine 'models' kullanıyoruz
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
				<Button variant="primary" type="submit" className="mt-2">Add Car</Button>
			</Form>
		</div>
	);
}

export default CarAdd;