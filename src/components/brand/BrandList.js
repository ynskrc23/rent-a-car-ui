// src/pages/BrandList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function BrandList() {
	const [brands, setBrands] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		fetchBrands();
	}, []);

	const fetchBrands = () => {
		axios.get('http://localhost:8080/api/brands')
			.then(response => {
				setBrands(response.data);
			})
			.catch(error => {
				console.error("There was an error fetching the brands!", error);
				setError('Error fetching brands.');
			});
	};

	const formatDate = (dateString) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		return format(date, 'yyyy-MM-dd HH:mm:ss');
	};

	const handleDeleteBrand = (id) => {
		if (window.confirm('Are you sure you want to delete this brand?')) {
			axios.delete(`http://localhost:8080/api/brands/${id}`)
				.then(response => {
					fetchBrands(); // Refresh the list after deleting a brand
				})
				.catch(error => {
					console.error("There was an error deleting the brand!", error);
					setError('Error deleting brand.');
				});
		}
	};

	return (
		<div>
			<h1>Brands List</h1>
			{error && <p className="text-danger">{error}</p>}
			<Link to="/add-brand">
				<Button variant="primary" className="mb-3">Add New Brand</Button>
			</Link>
			<Table striped bordered hover>
				<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Created At</th>
					<th>Updated At</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				{brands.map(brand => (
					<tr key={brand.id}>
						<td>{brand.id}</td>
						<td>{brand.name}</td>
						<td>{formatDate(brand.createdAt)}</td>
						<td>{formatDate(brand.updatedAt)}</td>
						<td>
							<Link to={`/update-brand/${brand.id}`}>
								<Button variant="warning" className="me-2">Edit</Button>
							</Link>
							<Button variant="danger" onClick={() => handleDeleteBrand(brand.id)}>Delete</Button>
						</td>
					</tr>
				))}
				</tbody>
			</Table>
		</div>
	);
}

export default BrandList;
