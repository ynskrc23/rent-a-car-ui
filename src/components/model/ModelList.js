// src/pages/ModelList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function ModelList() {
	const [models, setModels] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		fetchModels();
	}, []);

	const fetchModels = () => {
		axios.get('http://localhost:8080/api/models')
			.then(response => {
				setModels(response.data);
			})
			.catch(error => {
				console.error("There was an error fetching the models!", error);
				setError('Error fetching models.');
			});
	};

	const formatDate = (dateString) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		return format(date, 'yyyy-MM-dd HH:mm:ss');
	};

	const handleDeleteModel = (id) => {
		if (window.confirm('Are you sure you want to delete this model?')) {
			axios.delete(`http://localhost:8080/api/models/${id}`)
				.then(response => {
					fetchModels(); // Refresh the list after deleting a model
				})
				.catch(error => {
					console.error("There was an error deleting the model!", error);
					setError('Error deleting model.');
				});
		}
	};

	return (
		<div>
			<h4>Models List</h4>
			{error && <p className="text-danger">{error}</p>}
			<Link to="/add-model">
				<Button variant="primary" className="mb-3">Add New Model</Button>
			</Link>
			<Table striped bordered hover>
				<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Brand Name</th>
					<th>Created At</th>
					<th>Updated At</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				{models.map(model => (
					<tr key={model.id}>
						<td>{model.id}</td>
						<td>{model.name}</td>
						<td>{model.brand.name}</td>
						<td>{formatDate(model.createdAt)}</td>
						<td>{formatDate(model.updatedAt)}</td>
						<td>
							<Link to={`/update-model/${model.id}`}>
								<Button variant="warning" className="me-2">Edit</Button>
							</Link>
							<Button variant="danger" onClick={() => handleDeleteModel(model.id)}>Delete</Button>
						</td>
					</tr>
				))}
				</tbody>
			</Table>
		</div>
	);
}

export default ModelList;
