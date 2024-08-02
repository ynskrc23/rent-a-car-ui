// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from "./components/home/Home";
import Brand from "./components/brand/BrandList";
import BrandAdd from "./components/brand/BrandAdd";
import BrandUpdate from "./components/brand/BrandUpdate";

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
					</Routes>
				</Container>
			</div>
		</Router>
	);
}

export default App;
