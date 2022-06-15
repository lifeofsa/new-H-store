import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  Form,
  Image,
  ListGroup,
  Card,
} from 'react-bootstrap';
import { addToCart } from '../action/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { removeFromCart } from '../action/cartActions';
import Meta from '../components/Meta';
const CartScreen = ({ history, location, match }) => {
  const id = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { cartItems } = cart;
  console.log(cartItems);

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const proceedToCheckout = () => {
    if (userInfo) {
      history.push(`/shipping`);
    } else {
      history.push('/login');
    }
  };
  return (
    <>
      <Meta title='Cart'></Meta>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <Message>
              Please Add Something to Cart <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={2}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value)),
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='Button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce((accurate, item) => accurate + item.qty, 0)}
                  ) items
                </h2>
                Price $
                {cartItems
                  .reduce(
                    (accurate, item) => accurate + item.qty * item.price,
                    0,
                  )
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  onClick={proceedToCheckout}
                  disabled={cartItems.length === 0}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
