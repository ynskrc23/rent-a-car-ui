// src/pages/InvoiceDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { format } from 'date-fns';

function InvoiceDetail() {
	const { id } = useParams();
	const [invoice, setInvoice] = useState(null);
	const [error, setError] = useState('');

	useEffect(() => {
		fetchInvoiceDetails();
	}, [id]);

	const fetchInvoiceDetails = () => {
		axios.get(`http://localhost:8080/api/invoices/${id}`)
			.then(response => {
				setInvoice(response.data);
			})
			.catch(error => {
				console.error("There was an error fetching the invoice details!", error);
				setError('Error fetching invoice details.');
			});
	};

	const formatDate = (dateString) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		return format(date, 'yyyy-MM-dd HH:mm:ss');
	};

	if (error) {
		return <p className="text-danger">{error}</p>;
	}

	if (!invoice) {
		return <p>Loading invoice details...</p>;
	}

	return (
		<Card className="mb-4">
			<Card.Header>Invoice Details</Card.Header>
			<Card.Body>
				<Card.Title>Invoice ID: {invoice.id}</Card.Title>
				<Card.Text>
					<strong>Card Holder:</strong> {invoice.cardHolder}
				</Card.Text>
				<Card.Text>
					<strong>Brand Name:</strong> {invoice.brandName}
				</Card.Text>
				<Card.Text>
					<strong>Model Name:</strong> {invoice.modelName}
				</Card.Text>
				<Card.Text>
					<strong>Plate:</strong> {invoice.plate}
				</Card.Text>
				<Card.Text>
					<strong>Model Year:</strong> {invoice.modelYear}
				</Card.Text>
				<Card.Text>
					<strong>Daily Price:</strong> ${invoice.dailyPrice}
				</Card.Text>
				<Card.Text>
					<strong>Total Price:</strong> ${invoice.totalPrice}
				</Card.Text>
				<Card.Text>
					<strong>Rented for Days:</strong> {invoice.rentedForDays} days
				</Card.Text>
				<Card.Text>
					<strong>Rented At:</strong> {formatDate(invoice.rentedAt)}
				</Card.Text>
				<Link to="/invoices">
					<Button variant="secondary">Back to Invoices</Button>
				</Link>
			</Card.Body>
		</Card>
	);
}

export default InvoiceDetail;