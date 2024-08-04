// src/pages/AddModel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ModelAdd() {
	const [newModelName, setNewModelName] = useState('');
	const [brands, setBrands] = useState([]);
	const [selectedBrandId, setSelectedBrandId] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		axios.get('http://localhost:8080/api/brands')
			.then(response => {
				setBrands(response.data);
			})
			.catch(error => {
				console.error("There was an error fetching the brands!", error);
				setError('Error fetching brands.');
			});
	}, []);

	const handleAddModel = (event) => {
		event.preventDefault(); // Formun varsayılan davranışını engelle

		if (!newModelName.trim()) {
			setError('Model name cannot be empty.');
			return;
		}

		if (!selectedBrandId) {
			setError('Please select a brand.');
			return;
		}

		axios.post('http://localhost:8080/api/models', { name: newModelName, brandId: selectedBrandId })
			.then(response => {
				setNewModelName('');
				setSelectedBrandId('');
				setError('');
				navigate('/models'); // Redirect to the model list page
			})
			.catch(error => {
				console.error("There was an error adding the model!", error);
				setError('Error adding model.');
			});
	};

	return (
		<div>
			<h4>Add New Model</h4>
			{error && <p className="text-danger">{error}</p>}
			<Form onSubmit={handleAddModel}>
				<Form.Group className="mb-3">
					<Form.Label>New Model Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter model name"
						value={newModelName}
						onChange={(e) => setNewModelName(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Select Brand</Form.Label>
					<Form.Control
						as="select"
						value={selectedBrandId}
						onChange={(e) => setSelectedBrandId(e.target.value)}
					>
						<option value="">Select a brand</option>
						{brands.map((brand) => (
							<option key={brand.id} value={brand.id}>
								{brand.name}
							</option>
						))}
					</Form.Control>
				</Form.Group>
				<Button variant="primary" type="submit" className="mt-2">Add Model</Button>
			</Form>
		</div>
	);
}

export default ModelAdd;
