import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logoutAction } from '../action/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { orderListAction } from '../action/orderActions';
import { ORDER_LIST_RESET } from '../constants/orderConstants';
import Meta from '../components/Meta';
const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { error, loading, orders } = orderList;

  //   const userList = useSelector((state) => state.userList);
  //   const { error, users, loading } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!logoutAction()) {
    history.push('/login');
  }

  useEffect(() => {
    dispatch({ type: ORDER_LIST_RESET });
    if (userInfo && userInfo.isAdmin) {
      dispatch(orderListAction());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Meta title='Order List'></Meta>
      <h1>Orders List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table responsive hover className='table-sm' striped bordered>
          <thead>
            <tr>
              <td>ID</td>
              <td>NAME</td>
              <td>DATE</td>
              <td>ITEM PRICE</td>
              <td>TOTAL PRICE</td>
              <td>IS DELIVERED</td>
              <td>IS PAID</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.itemsPrice}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <a href={`/order/${order._id}`}>
                    <Button className='btn-sm' variant='light'>
                      Details
                    </Button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
