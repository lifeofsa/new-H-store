import React, { Fragment } from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
const Product = ({ product }) => {
  return (
    <Fragment>
      <Card className='my-3 p-3 rounded'>
        <a href={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' />
        </a>
        <Card.Body>
          <a href={`/product/${product._id}`}>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </a>
          <Card.Text as='div'>
            <div className='my-3'>
              <Rating
                value={product.rating}
                text={
                  product.numReviews <= 1
                    ? `${product.numReviews} review`
                    : `${product.numReviews} reviews`
                }
              />
            </div>
          </Card.Text>
          <Card.Text as='h3'>${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Product;
