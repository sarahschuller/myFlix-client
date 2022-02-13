import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

import { Link } from "react-router-dom";

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;

        return (
          <Card>
              <Card.Body>
                  <Card.Title>Genre</Card.Title>
                  <Card.Text>Name: {genre.Name} </Card.Text>
                  <Card.Text> Description: {genre.Description} </Card.Text>
                  <Link to={`/`}>
                    <Button onClick={() => onBackClick(null)} variant="primary">Back</Button>
                </Link>
              </Card.Body>
          </Card>
        );
    }
}

GenreView.proptypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
};