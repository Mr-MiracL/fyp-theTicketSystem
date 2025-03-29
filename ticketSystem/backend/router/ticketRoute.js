import express from "express"

import { createTicket, deleteTicket, getAllTickets, getTicket, updateTicket } from "../controllers/ticketController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const TicketRouter=express.Router();

TicketRouter.post("/:eventid",verifyAdmin, createTicket) 

TicketRouter.put("/:id",verifyAdmin, updateTicket)
TicketRouter.delete("/:id/:hotelid", verifyAdmin, deleteTicket)
TicketRouter.get("/:id", getTicket)

TicketRouter.get("/",getAllTickets)

export default TicketRouter;