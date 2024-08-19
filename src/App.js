// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from "./components/home/Home";
import Brand from "./components/brand/BrandList";
import BrandAdd from "./components/brand/BrandAdd";
import BrandUpdate from "./components/brand/BrandUpdate";
import Model from "./components/model/ModelList";
import ModelAdd from "./components/model/ModelAdd";
import ModelUpdate from "./components/model/ModelUpdate";
import Car from "./components/car/CarList";
import CarAdd from "./components/car/CarAdd";
import CarUpdate from "./components/car/CarUpdate";
import Rental from "./components/rental/RentalList";
import RentalAdd from "./components/rental/RentalAdd";

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar bg="light" expand="lg">
					<Container>
						<Navbar.Brand href="/">Brand</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link href="/">Home</Nav.Link>
								<Nav.Link href="/brands">Brand</Nav.Link>
								<Nav.Link href="/models">Model</Nav.Link>
								<Nav.Link href="/cars">Car</Nav.Link>
								<Nav.Link href="/rentals">Rental</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
				<Container>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/brands" element={<Brand />} />
						<Route path="/add-brand" element={<BrandAdd />} />
						<Route path="/update-brand/:id" element={<BrandUpdate />} />

						<Route path="/models" element={<Model />} />
						<Route path="/add-model" element={<ModelAdd />} />
						<Route path="/update-model/:id" element={<ModelUpdate />} />

						<Route path="/cars" element={<Car />} />
						<Route path="/add-car" element={<CarAdd />} />
						<Route path="/update-car/:id" element={<CarUpdate />} />

						<Route path="/rentals" element={<Rental />} />
						<Route path="/add-rental" element={<RentalAdd />} />
					</Routes>
				</Container>
			</div>
		</Router>
	);
}

export default App;
