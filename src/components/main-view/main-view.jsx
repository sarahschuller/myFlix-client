import React from 'react';
import axios from 'axios';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
// import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export class MainView extends React.Component {

  constructor (){
      super();
    // Initial state is set to null
      this.state = {
          movies: [],
          selectedMovie: null,
          user: null
      };
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(movie){
      this.setState({
          selectedMovie: movie
      });
  }

    // Register new users
   /* onRegistration(registration) {
        this.setState({
            registration,
        });
    } */

    // Existing user logs in
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    getMovies(token) {
      axios.get('https://flixfile.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  

  render() {
    const { movies, selectedMovie, user, /* registration */ } = this.state;

   /* if (!registration) return (<RegistrationView onRegistration={(registration) => this.onRegistration(registration)} />); */

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
  
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
    return (
        <div className="main-view">    
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">FlixFile</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/index">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
          <Row className="main-view justify-content-md-center">
            {selectedMovie
              ? (
                <Col md={8}>
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              )
              : movies.map((movie) => (
                <Col md={3} key={movie._id}>
                  <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                </Col>
              ))
            }
          </Row>
        </div>
      );
    };
}