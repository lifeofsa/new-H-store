import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { details } from '../action/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { update } from '../action/userActions';
import { myListOrderAction } from '../action/orderActions';
import { Link } from 'react-router-dom';
import Meta from '../components/Meta';

const ProfileScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const myListOrder = useSelector((state) => state.myListOrder);
  const { error: errorList, loading: loadingList, orders } = myListOrder;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(details('profile'));
        dispatch(myListOrderAction());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user, history]);
  const submitHandler = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage('Password did not match');
    } else if (password) {
      if (password.length < 6) {
        setMessage('Password must be 6 charachters long ');
      }
    }

    // Dispatch
    else {
      dispatch(update({ id: user._id, name, email, password }));
    }
  };

  return (
    <>
      {!loading ? (
        <Meta title={`Details | ${user.name}`} />
      ) : (
        <Meta title='Details' />
      )}
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {success && <Message variant='success'>Profile Updated</Message>}
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Re-enter Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row className='py-3'>
              <Col>
                <Button type='submit' variant='primary'>
                  Update Profile
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Order</h2>

          {loadingList ? (
            <Loader />
          ) : !orders.length ? (
            <h4>
              You did'nt order anything yet lets order from{' '}
              <Link to='/'>
                <Button variant='dark'>Shop</Button>
              </Link>
            </h4>
          ) : errorList ? (
            <Message variant='danger'>{errorList}</Message>
          ) : (
            <Table responsive striped hover bordered className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <a href={`/order/${order._id}`}>
                        <Button variant='light' className='btn-sm'>
                          Details
                        </Button>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};
export default ProfileScreen;
