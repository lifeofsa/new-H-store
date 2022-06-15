import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../action/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import TopProductCarousel from '../components/TopProductCarousel';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { products, error, loading, pages, page } = productList;

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch(productActions(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Fragment>
      <Meta />

      {!keyword ? (
        <TopProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      {keyword && <h3>{`Search result for  "${keyword}"`}</h3>}

      {!products?.length && !loading && (
        <Message variant='danger'>Product Not Found</Message>
      )}
      {!keyword && <h1>Latest Products</h1>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </Fragment>
  );
};

export default HomeScreen;
