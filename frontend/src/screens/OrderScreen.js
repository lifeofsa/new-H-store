import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Card, Image, ListGroup } from 'react-bootstrap';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import {
  detailsOrderAction,
  payOrderAction,
  deliverOrderAction,
} from '../action/orderActions';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { PAY_ORDER_RESET } from '../constants/orderConstants';
import { ORDER_DELIVER_RESET } from '../constants/orderConstants';
import Meta from '../components/Meta';
const OrderScreen = ({ match, history }) => {
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderId = match.params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const detailsOrder = useSelector((state) => state.detailsOrder);
  const { error, loading, order } = detailsOrder;

  const deliverOrder = useSelector((state) => state.deliverOrder);
  const {
    error: errorDeliver,
    loading: loadingDeliver,
    success: successDeliver,
  } = deliverOrder;

  const payOrder = useSelector((state) => state.payOrder);
  const { loading: loadingPay, success: successPay } = payOrder;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    const addPaypadScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || successDeliver) {
      dispatch({ type: PAY_ORDER_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(detailsOrderAction(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypadScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrderAction(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrderAction(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Meta title='Order Details'></Meta>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item></ListGroup.Item>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},
                {order.shippingAddress.city},{order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Paid on {order.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              {order.orderItems === 0 ? (
                <Message>Your Order Is Empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  <h2>Order Item</h2>
                  {order.orderItems.map((item, index) => (
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {errorDeliver && (
                <Message variant='danger'>{errorDeliver}</Message>
              )}
              <ListGroup.Item>
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <Button className='btn-block' onClick={deliverHandler}>
                      Mark as delivered
                    </Button>
                  )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
