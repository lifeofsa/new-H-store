import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ErrorScreen = () => {
  return (
    <>
      <Container>
        <div>
          <h1> 404 Not Found </h1>
          <p>Sorry This page doesn't exist</p>
          <Link to='/'>
            <Button variant='dark' className='btn-sm'>
              Go to Homepage
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default ErrorScreen;
