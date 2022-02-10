import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card>
        <Card.Body>
          <Card.Title>{director.Name}</Card.Title>
          <Card.Text>{director.Bio}</Card.Text>
          <Card.Text>Birth: {director.Birth}</Card.Text>
          <Card.Text>Death: {director.Death}</Card.Text>
          <Link to={`/`}>
            <Button onClick={() => onBackClick(null)} variant="primary">Back</Button>
        </Link>
        </Card.Body>
      </Card>
    );
  }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string
    }),
    onBackClick: PropTypes.func.isRequired
};