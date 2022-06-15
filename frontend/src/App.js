import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';

import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductUpdateScreen';
import OrderListScreen from './screens/OrderListScreen';
import Footer from './components/Footer';
import ErrorScreen from './screens/ErrorScreen';
const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/product/:id/:rid/reviews' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route exact path='/admin/userlist' component={UserListScreen} />
            <Route exact path='/admin/orderlist' component={OrderListScreen} />

            <Route
              exact
              path='/admin/user/:id/edit'
              component={UserEditScreen}
            />
            <Route
              exact
              path='/admin/productlist'
              component={ProductListScreen}
            />
            <Route
              exact
              path='/admin/productlist/:pageNumber'
              component={ProductListScreen}
            />
            <Route
              exact
              path='/admin/product/:id/edit'
              component={ProductEditScreen}
            />

            <Route exact path='/search/:keyword' component={HomeScreen} />
            <Route exact path='/page/:pageNumber' component={HomeScreen} />
            <Route
              exact
              path='/search/:keyword/page/:pageNumber'
              component={HomeScreen}
            />
            <Route exact path='/' component={HomeScreen} />
            <Route component={ErrorScreen} />
          </Switch>
        </Container>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
