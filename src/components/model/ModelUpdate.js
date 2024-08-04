// src/pages/UpdateModel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function ModelUpdate() {
	const { id } = useParams(); // Model ID'sini almak için
	const [modelName, setModelName] = useState('');
	const [brands, setBrands] = useState([]);
	const [selectedBrandId, setSelectedBrandId] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		// Modeli ve markaları yükle
		axios.get(`http://localhost:8080/api/models/${id}`)
			.then(response => {
				setModelName(response.data.name);
				setSelectedBrandId(response.data.brandId);
			})
			.catch(error => {
				console.error("There was an error fetching the model!", error);
				setError('Error fetching model.');
			});

		axios.get('http://localhost:8080/api/brands')
			.then(response => {
				setBrands(response.data);
			})
			.catch(error => {
				console.error("There was an error fetching the brands!", error);
				setError('Error fetching brands.');
			});
	}, [id]);

	const handleUpdateModel = (event) => {
		event.preventDefault(); // Formun varsayılan davranışını engelle

		if (!modelName.trim()) {
			setError('Model name cannot be empty.');
			return;
		}

		if (!selectedBrandId) {
			setError('Please select a brand.');
			return;
		}

		axios.put(`http://localhost:8080/api/models/${id}`, { name: modelName, brandId: selectedBrandId })
			.then(response => {
				setModelName('');
				setSelectedBrandId('');
				setError('');
				navigate('/models'); // Modeller listesine yönlendir
			})
			.catch(error => {
				console.error("There was an error updating the model!", error);
				setError('Error updating model.');
			});
	};

	return (
		<div>
			<h4>Update Model</h4>
			{error && <p className="text-danger">{error}</p>}
			<Form onSubmit={handleUpdateModel}>
				<Form.Group className="mb-3">
					<Form.Label>Model Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter model name"
						value={modelName}
						onChange={(e) => setModelName(e.target.value)}
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
				<Button variant="primary" type="submit" className="mt-2">Update Model</Button>
			</Form>
		</div>
	);
}

export default ModelUpdate;