import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel, Image } from 'react-bootstrap';
import { productCarouselAction } from '../action/productActions';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message';

const TopProductCarousel = () => {
  const dispatch = useDispatch();
  const productCarousel = useSelector((state) => state.productCarousel);
  const { loading, error, products } = productCarousel;

  useEffect(() => {
    dispatch(productCarouselAction());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TopProductCarousel;
