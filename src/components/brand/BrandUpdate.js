// src/pages/UpdateBrand.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function BrandUpdate() {
	const { id } = useParams(); // Markanın ID'sini almak için
	const [brandName, setBrandName] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		// Markayı yükle
		axios.get(`http://localhost:8080/api/brands/${id}`)
			.then(response => {
				setBrandName(response.data.name);
			})
			.catch(error => {
				console.error("There was an error fetching the brand!", error);
				setError('Error fetching brand.');
			});
	}, [id]);

	const handleUpdateBrand = (event) => {
		event.preventDefault(); // Formun varsayılan davranışını engelle

		if (!brandName.trim()) {
			setError('Brand name cannot be empty.');
			return;
		}

		axios.put(`http://localhost:8080/api/brands/${id}`, { name: brandName })
			.then(response => {
				setBrandName('');
				setError('');
				navigate('/brands'); // Markalar listesine yönlendir
			})
			.catch(error => {
				console.error("There was an error updating the brand!", error);
				setError('Error updating brand.');
			});
	};

	return (
		<div>
			<h1>Update Brand</h1>
			{error && <p className="text-danger">{error}</p>}
			<Form onSubmit={handleUpdateBrand}>
				<Form.Group className="mb-3">
					<Form.Label>Brand Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter brand name"
						value={brandName}
						onChange={(e) => setBrandName(e.target.value)}
					/>
					<Button variant="primary" type="submit" className="mt-2">Update Brand</Button>
				</Form.Group>
			</Form>
		</div>
	);
}

export default BrandUpdate;
