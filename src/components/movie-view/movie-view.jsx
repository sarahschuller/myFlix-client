import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-view.scss'

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  addFavoriteMovie() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.post(`https://flixfile.herokuapp.com/users/${user}/Favorites/${this.props.movie._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'POST'

    })
        .then(response => {
            alert(`Added to Favorites`)
        })
        .catch(function (error) {
            console.log(error);
        });
  };

  render() {
    const { movie, onBackClick } = this.props;

    return (
    <Row className="justify-content-md-center">
       <Card className="text-center bg-dark text-white" border="secondary">
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous"/>
        <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Card.Text>Genre: 
            <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">{movie.Genre.Name}</Button>
            </Link>
            </Card.Text>
            <Card.Text>Director:
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">{movie.Director.Name}</Button>
            </Link></Card.Text>
            <div className="mt-3">
                <Button variant="secondary" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>Add to Favorites</Button>
            </div>
            <div className="mt-3">
            <Button variant="outline-dark" onClick={() => { onBackClick(null); }}>Back</Button>
            </div>
        </Card.Body>
      </Card> 
       </Row>
    );
  }
}


MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    }),
  };