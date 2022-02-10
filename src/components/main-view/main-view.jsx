// React imports
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// Bootstrap styling imports
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';

// View imports
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenrerView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';

// Export MainView
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

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

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

  // Existing user logs out
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, user } = this.state;
  
    return (
        <div className="main-view">    
        {/* Navbar */}
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
                <Nav.Link href="/profile" onClick={() => { this.onLoggedIn ()}}>Profile</Nav.Link>
                <Nav.Link href="/index" onClick={() => { this.onLoggedOut()}}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Router>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              if (!user) {
                return <Redirect to="/login" />;
              }

              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />
            <Route path="/login" render={() => {
              if (user) {
                return <Redirect to="/" />;
              }
              return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
            }} />
            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
                  <RegistrationView />
                </Col>
            }} />
            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }
              if (movies.length === 0) {
                return <div className="main-view" />;
              }
              return (
              <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                onBackClick={() => history.goBack ()} />
              </Col>
              );
            }} />
              
            <Route path="/profile" render={({ history }) => {
              if(!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }
              return (
                <Col md={8}>
                  <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                </Col>
              );
            }} />
            <Route path="/directors/:name" render={({ match, history }) => {
                  if (!user) {
                      return (
                          <Col>
                              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                          </Col>
                      );
                  }

                  if (movies.length === 0) return <div className="main-view" />;

                  return (
                      <Col md={8}>
                          <DirectorView
                              director={movies.find(m => m.Director.Name === match.params.name).Director}
                              onBackClick={() => history.goBack()}
                              movies={movies.filter(movie => movie.Director.Name === match.params.name)} />
                      </Col>
                  );
              }} />
            <Route path="/genre/:name" render={({ match, history }) => {
              if (!user) {
                return (
                  <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
            }
            if (movies.length === 0) {
                return <div className="main-view" />;
            }
            return (
              <Col md={8}>
                  <GenreView
                      genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                      onBackClick={() => history.goBack()}
                      movies={movies.filter(movie => movie.Genre.Name === match.params.name)}/>
              </Col>
            )
        }} />
          </Row>
        </Router>

        </div> 
      );
    };
}