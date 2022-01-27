import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
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
    axios.get('https://flixfile.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(movie){
      this.setState({
          selectedMovie: movie
      });
  }

    // Register new users
    onRegistration(registration) {
        this.setState({
            registration,
        });
    }

    // Existing user logs in
    onLoggedIn(user) {
        this.setState({
            user
        });
    }
  

  render() {
    const { movies, selectedMovie, user, registration } = this.state;

    if (!registration) return (<RegistrationView onRegistration={(registration) => this.onRegistration(registration)} />);

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
  
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
    return (
        <div className="main-view">
         {selectedMovie
           ? (
             <Row className="justify-content-md-center">
               <Col md={8}>
                  <MovieView movie = {selectedMovie} onBackClick = {newSelectedMovie => {this.setSelectedMovie(newSelectedMovie);}}/>
              </Col>
            </Row>
          )
           : (
             <Row className="justify-content-md-center">
              {movies.map(movie => (
               <MovieCard key = {movie._id} movie = {movie} onMovieClick={(movie) => {this.setSelectedMovie(movie) }}/>
           ))}
             </Row>
            )
          }
        </div>
      );
    };
}