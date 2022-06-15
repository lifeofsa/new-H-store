import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  productIdActions,
  productUpdateAction,
} from '../action/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productIdList = useSelector((state) => state.productIdList);
  const { error, loading, product } = productIdList;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(productIdActions(productId));
      } else {
        setName(product.name);
        setImage(product.image);
        setPrice(product.price);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setCategory(product.category);
      }
    }
  }, [dispatch, history, product, productId, successUpdate]);
  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch
    dispatch(
      productUpdateAction({
        _id: productId,
        name,
        price,
        countInStock,
        description,
        brand,
        category,
        image,
      }),
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'geekyimages');

    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dbtqvhete/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      );

      // const file = await res.json();
      const file = await res.json();
      setImage(file.secure_url);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {successUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter product name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Enter Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Enter Price</Form.Label>
              <Form.Control
                type='number'
                label='Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Enter Category</Form.Label>
              <Form.Control
                type='text'
                label='Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image Url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                custom
                label='Choose File'
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Enter Description</Form.Label>
              <Form.Control
                type='text'
                label='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Enter Count In Stock</Form.Label>
              <Form.Control
                type='number'
                label='Count in stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Row className='py-3'>
              <Col>
                <Button type='submit' variant='primary'>
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
