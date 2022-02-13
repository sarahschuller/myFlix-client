import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

export function NavbarView({user}) {
    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };


<Navbar bg="light" expand="lg">
  <Container fluid>
    <Navbar.Brand href="#">FlixFile</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="#action1">Home</Nav.Link>
        <Nav.Link href="#action2">Link</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
}
