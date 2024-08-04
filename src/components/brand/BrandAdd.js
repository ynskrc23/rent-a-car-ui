// src/pages/AddBrand.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function BrandAdd() {
	const [newBrandName, setNewBrandName] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleAddBrand = (event) => {
		event.preventDefault(); // Formun varsayılan davranışını engelle

		if (!newBrandName.trim()) {
			setError('Brand name cannot be empty.');
			return;
		}

		axios.post('http://localhost:8080/api/brands', { name: newBrandName })
			.then(response => {
				setNewBrandName('');
				setError('');
				navigate('/brands'); // Redirect to the brand list page
			})
			.catch(error => {
				console.error("There was an error adding the brand!", error);
				setError('Error adding brand.');
			});
	};

	return (
		<div>
			<h4>Add New Brand</h4>
			{error && <p className="text-danger">{error}</p>}
			<Form onSubmit={handleAddBrand}>
				<Form.Group className="mb-3">
					<Form.Label>New Brand Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter brand name"
						value={newBrandName}
						onChange={(e) => setNewBrandName(e.target.value)}
					/>
					<Button variant="primary" type="submit" className="mt-2">Add Brand</Button>
				</Form.Group>
			</Form>
		</div>
	);
}

export default BrandAdd;
