import React from 'react';
import { Card, Button } from 'react-bootstrap';

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card className="bg-light text-black text-center">
        <Card.Body>
          <Card.Title>{director.Name}</Card.Title>
          <Card.Text>{director.Bio}</Card.Text>
          <Card.Text>Birth: {director.Birth}</Card.Text>
          {/* <Card.Text>Death: {director.Death}</Card.Text> */}
          <Link to={`/`}>
            <Button onClick={() => onBackClick(null)} variant="primary">Back</Button>
        </Link>
        </Card.Body>
      </Card>
    );
  }
}
