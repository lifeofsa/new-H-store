import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import FacebookLogin from 'react-facebook-login';

import {
  userDeleteAction,
  userLoginAction,
  facebookLoginAction,
} from '../action/userActions';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const LoginScreen = ({ location }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const facebookLogin = useSelector((state) => state.fbLogin);
  const {
    loading: fbLoading,
    error: fbError,
    userInfo: fbUserInfo,
  } = facebookLogin;
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';
  useEffect(() => {
    if (userInfo) {
      history.push('/');
    } else {
      history.push('/login');
    }
  }, [userInfo, history, redirect, fbUserInfo]);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setMessage('Please fill ot the feild first');
    }
    //DISPATCH

    dispatch(userLoginAction(email, password));
  };
  const submitFacebook = (response) => {
    dispatch(facebookLoginAction(response));
  };

  // const responseFacebook = (response) => {
  //   // axios({
  //   //   method: 'POST',
  //   //   url: '/api/users/facebook',
  //   //   data: {
  //   //     accessToken: response.accessToken,
  //   //     userID: response.userID,
  //   //     // name: response.name,
  //   //     // email: response.email,
  //   //   },
  //   // }).then((responses) => {
  //   //   console.log('Facebook Login Succesfull', responses);
  //   // });
  //   console.log(response);
  // };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {fbError && <Message variant='danger'>{fbError}</Message>}
      {loading && <Loader />}
      {fbLoading && <Loader />}
      <Form onSubmit={formSubmitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Row
          className='py-3'
          style={{ justifyContent: 'end', display: 'flex' }}
        >
          <Col>
            <Button type=' submit' variant='primary'>
              Sign In
            </Button>
          </Col>
          <Col>
            <h4 className='bold'>OR</h4>
          </Col>
          <Col>
            <FacebookLogin
              disableMobileRedirect={true}
              appId='1358456141280819'
              fields='name, email'
              autoLoad={false}
              callback={submitFacebook}
              redirectUri={
                'https://h-storecart.herokuapp.com/?state={st=state123abc,ds=123456789}'
              }
              cssClass='btnFacebook'
              // authType='rerequest'
              // scope='name,email'
              // returnScopes={true}
              state={'{st=state123abc,ds=123456789}'}
              icon={
                <i
                  class='fa-brands fa-facebook-f'
                  style={{ marginRight: '5px' }}
                ></i>
              }
              // icon={<i className="fa fa-facebook"  />
              // textButton='asd'
            />
          </Col>
        </Row>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
