// React imports
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// Redux reducers/store imports
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

// Bootstrap styling imports
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';

// View imports
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';

// Export MainView
class MainView extends React.Component {

  constructor (){
      super();
    // Initial state is set to null
      this.state = {
          user: null
      };
  }

  getMovies(token) {
    axios.get('https://flixfile.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getUser() {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios.get(`https://flixfile.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
        .then((response) => {
            this.props.setUser({
                username: response.data.Username,
                password: response.data.Password,
                email: response.data.Email,
                birthday: response.data.Birthday,
                favorites: response.data.FavoriteMovies
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
    let { movies } = this.props;
    let { user } = this.state;
    
    return (
        <div className="main-view">    
        {/* Navbar */}
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="/">FlixFile</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/profile" onClick={() => { this.onLoggedIn ()}}>Profile</Nav.Link>
                <Nav.Link href="/" onClick={() => { this.onLoggedOut()}}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Router>
          <Row className="main-view justify-content-md-center">
            
             {/* Index route */}
            <Route exact path="/" render={() => {
              if (!user) {
                return <Redirect to="/login" />;
              }

              if (movies.lenth === 0) return <div
              className="main-view" />;
              console.log(this.state);
              return <MoviesList movies={movies} />;
            }} />
            
            {/* Movie Route */}
            <Route path="/movies/:movieId" render={({ match, history }) => {
                if (movies.length === 0) return <div className="main-view" />;
                console.log(movies)
                return <Col lg={9}>
                    <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                        onBackClick={() => history.goBack()} />
                </Col>
            }} />

            {/* Login Route */}
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
            <Route path="/genres/:name" render={({ match, history }) => {
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

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, {
  setMovies } )(MainView);