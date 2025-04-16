import Payment from '../models/payment.js';
import Order from '../models/orders.js';

const createPayment = async (req, res, next) => {
  const { orderId, paymentMethod, amount, transactionId } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const payment = new Payment({
      order: orderId,
      paymentMethod,
      amount,
      transactionId,
      paymentStatus: 'completed',
    });

    await payment.save();

    await Order.findByIdAndUpdate(orderId, {
      status: 'completed',
    });

    res.status(201).json({ message: 'Payment processed successfully', payment });
  } catch (err) {
    next(err);
  }
};

export { createPayment };
