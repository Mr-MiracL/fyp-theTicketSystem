 import tickets from "../models/tickets.js";
import { createError} from "../utils/error.js";
import events from "../models/events.js";

export const createTicket= async(req,res,next)=>{
 const eventId= req.params.eventid;
 const newTicket= new tickets(req.body)

 try{
    const savedTicket = await newTicket.save()
    try{
        await events.findByIdAndUpdate(eventId,{
            $push: {tickets: savedTicket._id},
        });
    }catch(err){
    next(err);
 }
 res.status(200).json(savedTicket);
}catch (err){
    next(err)
}
}

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

export const getTicket= async (req,res, next)=>{
    
        try{
            const Ticket1= await Tickets.findById(req.params.id)
            res.status(200).json(Ticket1)
        }catch(err){
            next(err);

}
}

export const getAllTickets= async (req,res, next)=>{
    try{
        const allTickets=await Tickets.find();
        
        res.status(200).json(allTickets);
    
      }catch(err){
       next(err)
        

}
}