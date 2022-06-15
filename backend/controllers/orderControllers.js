import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

// @desc       Create Order
// @method     POST /api/orders
// @access     private
const orderCreateController = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      user: req.user?._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc       GET Order by ID
// @method     GET/api/orders/:id
// @access     private
const orderGetController = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email',
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('order not found');
  }
});

// @desc       Update Payment by ID
// @method     PUT/api/orders/:id/pay
// @access     private
const updatePayOrderController = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
};

// @desc       Update Delivery Status
// @method     PUT/api/orders/:id/deliver
// @access     private/admin
const updateDeliverController = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
};

// @desc       GET order for each user
// @method     GET/api/orders/myorders
// @access     private
const getMyOrdersController = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// // @desc       GET order admin user
// // @method     GET/api/admin/orderlist
// // @access     private
const getMyOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
  orderCreateController,
  orderGetController,
  updatePayOrderController,
  getMyOrdersController,
  getMyOrder,
  updateDeliverController,
};
