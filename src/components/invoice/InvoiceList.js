// src/pages/InvoiceList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function InvoiceList() {
	const [invoices, setInvoices] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		fetchInvoices();
	}, []);

	const fetchInvoices = () => {
		axios.get('http://localhost:8080/api/invoices')
			.then(response => {
				setInvoices(response.data);
			})
			.catch(error => {
				console.error("There was an error fetching the invoices!", error);
				setError('Error fetching invoices.');
			});
	};

	const formatDate = (dateString) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		return format(date, 'yyyy-MM-dd HH:mm:ss');
	};

	const handleDeleteInvoice = (id) => {
		if (window.confirm('Are you sure you want to delete this invoice?')) {
			axios.delete(`http://localhost:8080/api/invoices/${id}`)
				.then(response => {
					fetchInvoices(); // Refresh the list after deleting a car
				})
				.catch(error => {
					console.error("There was an error deleting the invoice!", error);
					setError('Error deleting invoice.');
				});
		}
	};
	
	return (
		<div>
			<h4>Invoices List</h4>
			{error && <p className="text-danger">{error}</p>}
			<Table striped bordered hover>
				<thead>
				<tr>
					<th>ID</th>
					<th>Card Holder</th>
					<th>Brand Name</th>
					<th>Model Name</th>
					<th>Plate</th>
					<th>Model Year</th>
					<th>Daily Price</th>
					<th>Total Price</th>
					<th>Rented For Days</th>
					<th>Rented At</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				{invoices.map(invoice => (
					<tr key={invoice.id}>
						<td>{invoice.id}</td>
						<td>{invoice.cardHolder}</td>
						<td>{invoice.brandName}</td>
						<td>{invoice.modelName}</td>
						<td>{invoice.plate}</td>
						<td>{invoice.modelYear}</td>
						<td>${invoice.dailyPrice}</td>
						<td>${invoice.totalPrice}</td>
						<td>{invoice.rentedForDays}</td>
						<td>{formatDate(invoice.rentedAt)}</td>
						<td>
							<Link to={`/invoice/${invoice.id}`}>
								<Button variant="info" className="me-2">Details</Button>
							</Link>
							<Button variant="danger" onClick={() => handleDeleteInvoice(invoice.id)}>Delete</Button>
						</td>
					</tr>
				))}
				</tbody>
			</Table>
		</div>
	);
}

export default InvoiceList;
