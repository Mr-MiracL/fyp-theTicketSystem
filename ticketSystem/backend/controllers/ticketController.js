 import tickets from "../models/tickets.js";
import { createError} from "../utils/error.js";
import events from "../models/events.js";
import mongoose from "mongoose";

export const createTicket = async (req, res, next) => {
    const eventId = req.params.eventid;
  
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid Event ID" });
    }
  
    const newTicket = new tickets({
      ...req.body,
      event: eventId, 
    });
  
    try {
      const savedTicket = await newTicket.save();
  
      await events.findByIdAndUpdate(eventId, {
        $push: { tickets: savedTicket._id },
      });
  
      res.status(201).json(savedTicket);
    } catch (err) {
      next(err);
    }
  };
  

export const updateTicket= async (req,res, next)=>{
    
        try{
            const updateTicket= await tickets.findByIdAndUpdate(
                req.params.id,
                {$set:req.body},
                {new:true}

            )
            res.status(200).json(updateTicket)
        }catch(err){
            next(err);

}
}

export const deleteTicket= async (req,res, next)=>{
    const eventId= req.params.eventid;

        try{
           await tickets.findByIdAndDelete(req.params.id)
           try{
            await events.findByIdAndUpdate(eventId,{
                $pull: { tickets : req.params.id},
            })
           }catch(err){
           next(err);
        }
            res.status(200).json("Ticket has been deleted")
        }catch(err){
            next(err);

}
}

export const getAllTickets= async (req,res, next)=>{
    try{
        const allTickets=await tickets.find();
        
        res.status(200).json(allTickets);
    
      }catch(err){
       next(err)
        

}
}

export const getTicketsByEvent = async (req, res, next) => {
  const eventId = req.params.eventid;

  // 确保 eventId 是有效的 ObjectId
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(400).json({ message: "Invalid Event ID" });
  }

  try {
 
    const event = await events.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const ticketsForEvent = await tickets.find({ event: eventId });

    if (ticketsForEvent.length === 0) {
      return res.status(404).json({ message: "No tickets found for this event." });
    }

    res.status(200).json(ticketsForEvent);
  } catch (err) {

    next(err);
  }
};

  

  export const getTicket = async (req, res) => {
    const { ticketid } = req.params;
  
    try {

      const ticket = await tickets.findById(ticketid);
  

      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found." });
      }

      res.status(200).json(ticket);
    } catch (err) {
      res.status(500).json({ message: "Server error while fetching ticket", error: err.message });
    }
  };