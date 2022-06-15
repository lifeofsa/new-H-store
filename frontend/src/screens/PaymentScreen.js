import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { cartPaymentMethod } from '../action/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';
const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

    //DISPATCH
    dispatch(cartPaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <>
      <Meta title='Payment Method'></Meta>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1> Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
                id='PayPal'
                type='radio'
                value='PayPal'
                label='PayPal or Credit Card'
                name='paymentMethod'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Row className='py-3'>
            <Col>
              <Button type='submit' variant='primary'>
                Continue
              </Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
