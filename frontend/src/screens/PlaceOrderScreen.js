import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Card, Image, ListGroup } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { createOrderAction } from '../action/orderActions';
import Meta from '../components/Meta';
const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const createOrder = useSelector((state) => state.createOrder);
  const { error, success, order } = createOrder;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const cart = useSelector((state) => state.cart);

  const placeOrderHandler = () => {
    dispatch(
      createOrderAction({
        shippingAddress: cart.shippingAddress,
        itemsPrice: cart.itemsPrice,
        orderItems: cart.cartItems,
        totalPrice: cart.totalPrice,
        paymentMethod: cart.paymentMethod,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
      }),
    );
  };

  // !----Prices-----! //
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimal(
    cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0),
  );

  cart.shippingPrice = addDecimal(
    cart.itemsPrice > 1000
      ? 0
      : cart.itemsPrice > 500
      ? 30
      : cart.itemsPrice > 100
      ? 50
      : 60,
  );
  cart.taxPrice = addDecimal(Number((0.1 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  return (
    <>
      <Meta title='Place Order' />;
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city},{cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              {cart.cartItems === 0 ? (
                <Message>Your Cart Is Empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  <h2>Order Item</h2>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
