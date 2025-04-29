import Order from '../models/orders.js';
import Ticket from '../models/tickets.js';


    export const createOrder = async (req, res, next) => {
        const { user, tickets } = req.body;
      
        try {
          let totalAmount = 0;
      
          
          const ticketDetails = await Promise.all(
            tickets.map(async (item) => {
              const ticket = await Ticket.findById(item.ticket).populate('event');
              if (!ticket) throw new Error(`Ticket not found: ${item.ticket}`);
      
              const subTotal = ticket.price * item.quantity;
              totalAmount += subTotal;
      
              
              if (ticket.availableTickets < item.quantity) {
                throw new Error(`Not enough tickets available for ${ticket._id}`);
              }
              
              ticket.availableTickets -= item.quantity;
              await ticket.save();
      
              return {
                ticket: ticket._id,
                quantity: item.quantity,
              };
            })
          );
      
          
          if (isNaN(totalAmount) || totalAmount <= 0) {
            return res.status(400).json({ message: "Invalid totalAmount" });
          }
      
       
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
export const deleteUserOrder = async (req, res, next) => {
  const { userid, orderid } = req.params;

  try {
   
    const order = await Order.findOne({ _id: orderid, user: userid });
    if (!order) {
      return res.status(404).json({ message: 'Order not found for this user' });
    }

   
    await Order.deleteOne({ _id: orderid });

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    next(err);
  }
};
export const cancelUserOrder = async (req, res) => {
  const { userid, orderid } = req.params;

  try {
    const order = await Order.findOne({ _id: orderid, user: userid }); 
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
   }

   if (order.status === "cancelled") {
   return res.status(400).json({ message: "Order already cancelled." });
    }

    order.status = "cancelled";
   await order.save();

    res.status(200).json({ message: "Order cancelled successfully." });
 } catch (error) {
    console.error("Cancel Order Error:", error); 
   res.status(500).json({ message: "Server error while cancelling order." });
 }
};
