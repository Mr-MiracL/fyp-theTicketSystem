import Order from '../models/orders.js';
import Ticket from '../models/tickets.js';

// 创建订单
export const createOrder = async (req, res, next) => {
  const { user, tickets } = req.body;

  try {
    let totalAmount = 0;

    // 查票并计算价格
    const ticketDetails = await Promise.all(
      tickets.map(async (item) => {
        const ticket = await Ticket.findById(item.ticket).populate('event');
        if (!ticket) throw new Error(`Ticket not found: ${item.ticket}`);

        const subTotal = ticket.ticketPrice * item.quantity;
        totalAmount += subTotal;

        return {
          ticket: ticket._id,
          quantity: item.quantity,
        };
      })
    );

    const newOrder = new Order({
      user,
      tickets: ticketDetails,
      totalAmount,
      status: 'pending',
    });

    const savedOrder = await newOrder.save();

    const populatedOrder = await savedOrder.populate({
      path: 'tickets.ticket',
      populate: { path: 'event', model: 'Event' },
    });

    res.status(201).json(populatedOrder);
  } catch (err) {
    next(err);
  }
};

// 获取某个用户的所有订单
export const getOrdersByUser = async (req, res, next) => {
  const userId = req.params.userid;

  try {
    const orders = await Order.find({ user: userId })
      .populate({
        path: 'tickets.ticket',
        populate: { path: 'event', model: 'Event' },
      })
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

// 获取某个用户的指定订单
export const getUserOrderById = async (req, res, next) => {
  const { userid, orderid } = req.params;

  try {
    const order = await Order.findOne({ _id: orderid, user: userid })
      .populate({
        path: 'tickets.ticket',
        populate: { path: 'event', model: 'Event' },
      });

    if (!order) {
      return res.status(404).json({ message: 'Order not found for this user' });
    }

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
