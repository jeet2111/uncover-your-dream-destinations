import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Uncover Your Dream Destinations</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/destination">Destinations</Nav.Link>
            <Nav.Link as={Link} to="/budget">Budget</Nav.Link>
            {/* <Nav.Link as={Link} to="/counselling">Counselling</Nav.Link> */}
            <Nav.Link as={Link} to="/feedback">Feedback</Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;