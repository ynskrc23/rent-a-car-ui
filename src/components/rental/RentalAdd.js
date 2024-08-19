// src/pages/AddRental.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function RentalAdd() {
	const [rentedForDays, setRentedForDays] = useState(0);
	const [dailyPrice, setDailyPrice] = useState('');
	const [cars, setCars] = useState([]);
	const [selectedCarId, setSelectedCarId] = useState('');
	const [paymentRequest, setPaymentRequest] = useState({
		cardExpirationYear: '',
		cardExpirationMonth: '',
		cardNumber: '',
		cardHolder: '',
		cardCvv: ''
	});
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		axios.get('http://localhost:8080/api/cars')
			.then(response => {
				setCars(response.data);
			})
			.catch(error => {
				console.error("There was an error fetching the cars!", error);
				setError('Error fetching cars.');
			});
	}, []);

	const handleAddRental = (event) => {
		event.preventDefault();

		if (!selectedCarId) {
			setError('Please select a car.');
			return;
		}

		if (!dailyPrice || isNaN(dailyPrice)) {
			setError('Daily price must be a valid number.');
			return;
		}

		const newRental = {
			carId: selectedCarId,
			rentedForDays: parseInt(rentedForDays, 10),
			dailyPrice: parseFloat(dailyPrice),
			paymentRequest: {
				cardExpirationYear: parseInt(paymentRequest.cardExpirationYear, 10),
				cardExpirationMonth: parseInt(paymentRequest.cardExpirationMonth, 10),
				cardNumber: paymentRequest.cardNumber.trim(),
				cardHolder: paymentRequest.cardHolder.trim(),
				cardCvv: paymentRequest.cardCvv.trim()
			}
		};

		axios.post('http://localhost:8080/api/rentals', newRental)
			.then(response => {
				setSelectedCarId('');
				setRentedForDays(0);
				setDailyPrice('');
				setPaymentRequest({
					cardExpirationYear: '',
					cardExpirationMonth: '',
					cardNumber: '',
					cardHolder: '',
					cardCvv: ''
				});
				setError('');
				navigate('/rentals');
			})
			.catch(error => {
				console.error("There was an error adding the rental!", error);
				setError('Error adding rental.');
			});
	};

	return (
		<div>
			<h4>Add New Rental</h4>
			{error && <p className="text-danger">{error}</p>}
			<Form onSubmit={handleAddRental}>
				<Form.Group className="mb-3">
					<Form.Label>Select Car</Form.Label>
					<Form.Control
						as="select"
						value={selectedCarId}
						onChange={(e) => setSelectedCarId(e.target.value)}
					>
						<option value="">Select a car</option>
						{cars.map((car) => (
							<option key={car.id} value={car.id}>
								{car.plate}
							</option>
						))}
					</Form.Control>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Rented for Days</Form.Label>
					<Form.Control
						type="number"
						placeholder="Enter rented for days"
						value={rentedForDays}
						onChange={(e) => setRentedForDays(e.target.value)}
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
					<Form.Label>Card Expiration Year</Form.Label>
					<Form.Control
						type="number"
						placeholder="Enter card expiration year"
						value={paymentRequest.cardExpirationYear}
						onChange={(e) => setPaymentRequest({ ...paymentRequest, cardExpirationYear: e.target.value })}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Card Expiration Month</Form.Label>
					<Form.Control
						type="number"
						placeholder="Enter card expiration month"
						value={paymentRequest.cardExpirationMonth}
						onChange={(e) => setPaymentRequest({ ...paymentRequest, cardExpirationMonth: e.target.value })}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Card Number</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter card number"
						value={paymentRequest.cardNumber}
						onChange={(e) => setPaymentRequest({ ...paymentRequest, cardNumber: e.target.value })}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Card Holder</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter card holder"
						value={paymentRequest.cardHolder}
						onChange={(e) => setPaymentRequest({ ...paymentRequest, cardHolder: e.target.value })}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Card CVV</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter card CVV"
						value={paymentRequest.cardCvv}
						onChange={(e) => setPaymentRequest({ ...paymentRequest, cardCvv: e.target.value })}
					/>
				</Form.Group>
				<Button variant="primary" type="submit" className="mt-2">Add Rental</Button>
			</Form>
		</div>
	);
}

export default RentalAdd;