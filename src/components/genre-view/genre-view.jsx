import React from 'react';
import { Card, Button } from 'react-bootstrap';

import { Link } from "react-router-dom";

export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;

        return (
          <Card className="bg-light text-black text-center">
              <Card.Body>
                  <Card.Title>{genre.Name}</Card.Title>
                  <Card.Text> {genre.Description} </Card.Text>
                  <Link to={`/`}>
                    <Button onClick={() => onBackClick(null)} variant="primary">Back</Button>
                </Link>
              </Card.Body>
          </Card>
        );
    }
}
