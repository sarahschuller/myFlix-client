import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  render() {
    const { Genre, onBackClick } = this.props;

    return (
      <Card>
        <Card.Body>
          <Card.Title>{Genre.Name}</Card.Title>
          <Card.Text>{Genre.Description}</Card.Text>
          <Link to={`/`}>
            <Button onClick={() => onBackClick(null)} variant="primary">Back</Button>
        </Link>
        </Card.Body>
      </Card>
    );
  }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string
    }),
    onBackClick: PropTypes.func.isRequired
};