// src/pages/CarList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function CarList() {
	const [cars, setCars] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		fetchCars();
	}, []);

	const fetchCars = () => {
		axios.get('http://localhost:8080/api/cars')
			.then(response => {
				setCars(response.data);
			})
			.catch(error => {
				console.error("There was an error fetching the cars!", error);
				setError('Error fetching cars.');
			});
	};

	const formatDate = (dateString) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		return format(date, 'yyyy-MM-dd HH:mm:ss');
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat('tr-TR', {
			style: 'currency',
			currency: 'TRY'
		}).format(amount);
	};

	const handleDeleteCar = (id) => {
		if (window.confirm('Are you sure you want to delete this car?')) {
			axios.delete(`http://localhost:8080/api/cars/${id}`)
				.then(response => {
					fetchCars(); // Refresh the list after deleting a car
				})
				.catch(error => {
					console.error("There was an error deleting the car!", error);
					setError('Error deleting car.');
				});
		}
	};

	return (
		<div>
			<h4>Cars List</h4>
			{error && <p className="text-danger">{error}</p>}
			<Link to="/add-car">
				<Button variant="primary" className="mb-3">Add New Car</Button>
			</Link>
			<Table striped bordered hover>
				<thead>
				<tr>
					<th>ID</th>
					<th>Brand Name</th>
					<th>Model Name</th>
					<th>Model Year</th>
					<th>Plate</th>
					<th>State</th>
					<th>Daily Price</th>
					<th>Created At</th>
					<th>Updated At</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				{cars.map(car => (
					<tr key={car.id}>
						<td>{car.id}</td>
						<td>{car.modelBrandName}</td>
						<td>{car.modelName}</td>
						<td>{car.modelYear}</td>
						<td>{car.plate}</td>
						<td>{car.state}</td>
						<td>{formatCurrency(car.dailyPrice)}</td>
						<td>{formatDate(car.createdAt)}</td>
						<td>{formatDate(car.updatedAt)}</td>
						<td>
							<Link to={`/update-car/${car.id}`}>
								<Button variant="warning" className="me-2">Edit</Button>
							</Link>
							<Button variant="danger" onClick={() => handleDeleteCar(car.id)}>Delete</Button>
						</td>
					</tr>
				))}
				</tbody>
			</Table>
		</div>
	);
}

export default CarList;