import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  productActions,
  productCreateAction,
  productDeleteAction,
} from '../action/productActions';
import {
  logoutAction,
  userDeleteAction,
  userListAction,
} from '../action/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productDelete = useSelector((state) => state.productDelete);
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    error: errorCreate,
    loading: loadingCreate,
    success: successCreate,
    product: createProduct,
  } = productCreate;

  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { error, products, loading, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (!logoutAction()) {
    history.push('/login');
  }

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push('/login');
    }
    if (successCreate) {
      history.push(`/admin/product/${createProduct._id}/edit`);
    } else {
      dispatch(productActions('', pageNumber));
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, pageNumber]);
  const deleteHandler = (id) => {
    // DELETE PRODUCT
    dispatch(productDeleteAction(id));
  };

  const createProductHandler = () => {
    // CREATE PRODUCT
    dispatch(productCreateAction());
  };
  return (
    <>
      <Meta title='Product List' />
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{loadingCreate}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{loadingDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table responsive hover className='table-sm' striped bordered>
            <thead>
              <tr>
                <td>ID</td>
                <td>NAME</td>
                <td>PRICE</td>
                <td>STOCK</td>
                <td>CATEGORY</td>
                <td>BRAND</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
