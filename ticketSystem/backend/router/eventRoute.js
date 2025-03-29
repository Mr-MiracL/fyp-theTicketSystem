import express from "express"

import { createEvent, deleteEvent, getAllEvents, getEvent, updateEvent } from "../controllers/eventController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const eventRouter=express.Router();

eventRouter.post("/",verifyAdmin, createEvent) 

eventRouter.put("/:id",verifyAdmin, updateEvent)
eventRouter.delete("/:id", verifyAdmin, deleteEvent)
eventRouter.get("/:id", getEvent)

eventRouter.get("/",getAllEvents)

export default eventRouter;