import express from "express"

import { createTicket, deleteTicket, getAllTickets, getTicket, updateTicket,getTicketsByEvent } from "../controllers/ticketController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const TicketRouter=express.Router();

TicketRouter.post("/:eventid",verifyAdmin, createTicket) 

TicketRouter.put("/:id",verifyAdmin, updateTicket)
TicketRouter.delete("/:id/:eventid", verifyAdmin, deleteTicket)
TicketRouter.get("/ticket/:ticketid", getTicket);

TicketRouter.get("/",getAllTickets)
TicketRouter.get("/tickets/:eventid", getTicketsByEvent);


export default TicketRouter;