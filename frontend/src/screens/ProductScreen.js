import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Image,
  Button,
  ListGroup,
  Form,
  FormLabel,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import {
  productIdActions,
  productReviewAction,
  productReviewDeleteAction,
} from '../action/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  PRODUCT_REVIEW_DELETE_RESET,
  PRODUCT_REVIEW_RESET,
} from '../constants/productConstants';
import Meta from '../components/Meta';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [numReviews, setNumReviews] = useState(0);
  const dispatch = useDispatch();

  const productIdList = useSelector((state) => state.productIdList);
  const { product, loading, error } = productIdList;

  const productReview = useSelector((state) => state.productReview);
  const { success: successReview, error: errorReview } = productReview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewDelete = useSelector((state) => state.productReviewDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productReviewDelete;

  useEffect(() => {
    if (successReview) {
      alert('Review added');
      setComment('');
      setRating(0);
      dispatch({ type: PRODUCT_REVIEW_RESET });
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_REVIEW_DELETE_RESET });
      alert('Review Deleted');
      // setRating(0)
    }
    dispatch(productIdActions(match.params.id));
  }, [match, dispatch, successReview, successDelete]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      productReviewAction(match.params.id, {
        comment,
        rating,
      }),
    );
  };
  const deleteHandler = (id, rid) => {
    dispatch(productReviewDeleteAction(id, rid));
  };
  return (
    <>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      <Meta title={product.name} />
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={
                      product.numReviews <= 1
                        ? `${product.numReviews} review`
                        : `${product.numReviews} reviews`
                    }
                  />
                </ListGroup.Item>
                <ListGroup.Item> Price : ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Discription : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ),
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h3>Reviews</h3>
              {product.reviews.length === 0 && <Message> No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                    {userInfo && userInfo.isAdmin && (
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id, review._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <ListGroup variant='flush'>
                <h3>Write a Customer review</h3>
                {errorReview && <Message>{errorReview}</Message>}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <FormLabel>Rating</FormLabel>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                      >
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Bad</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows='3'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                      ></Form.Control>
                    </Form.Group>
                    <Row>
                      <Col className='py-3'>
                        <Button type='submit'>Add Review</Button>
                      </Col>
                    </Row>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to='/login'>Sign in</Link> to add a review
                  </Message>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
