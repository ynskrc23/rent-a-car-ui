// src/pages/RentalList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function RentalList() {
	const [rentals, setRentals] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		fetchRentals();
	}, []);

	const fetchRentals = () => {
		axios.get('http://localhost:8080/api/rentals')
			.then(response => {
				setRentals(response.data);
			})
			.catch(error => {
				console.error("There was an error fetching the rentals!", error);
				setError('Error fetching rentals.');
			});
	};

	const formatDate = (dateString) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		return format(date, 'yyyy-MM-dd HH:mm:ss');
	};

	const handleDeleteRental = (id) => {
		if (window.confirm('Are you sure you want to delete this rental?')) {
			axios.delete(`http://localhost:8080/api/rentals/${id}`)
				.then(response => {
					fetchRentals(); // Refresh the list after deleting a rental
				})
				.catch(error => {
					console.error("There was an error deleting the rental!", error);
					setError('Error deleting rental.');
				});
		}
	};

	return (
		<div>
			<h4>Rentals List</h4>
			{error && <p className="text-danger">{error}</p>}
			<Link to="/add-rental">
				<Button variant="primary" className="mb-3">Add New Rental</Button>
			</Link>
			<Table striped bordered hover>
				<thead>
				<tr>
					<th>ID</th>
					<th>Brand Name</th>
					<th>Model Name</th>
					<th>Model Year</th>
					<th>Plate</th>
					<th>Daily Price</th>
					<th>Rented For Days</th>
					<th>Total Price</th>
					<th>Start Date</th>
					<th>Created At</th>
					<th>Updated At</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				{rentals.map(rental => (
					<tr key={rental.id}>
						<td>{rental.id}</td>
						<td>{rental.car.modelBrandName}</td>
						<td>{rental.car.modelName}</td>
						<td>{rental.car.modelYear}</td>
						<td>{rental.car.plate}</td>
						<td>{rental.dailyPrice}</td>
						<td>{rental.rentedForDays}</td>
						<td>{rental.totalPrice}</td>
						<td>{formatDate(rental.startDate)}</td>
						<td>{formatDate(rental.createdAt)}</td>
						<td>{formatDate(rental.updatedAt)}</td>
						<td>
							<Button variant="danger" onClick={() => handleDeleteRental(rental.id)}>Delete</Button>
						</td>
					</tr>
				))}
				</tbody>
			</Table>
		</div>
	);
}

export default RentalList;