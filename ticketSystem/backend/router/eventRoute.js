import express from "express"

import { createEvent, deleteEvent, getAllEvents, getEvent, updateEvent } from "../controllers/eventController.js";

const eventRouter=express.Router();

eventRouter.post("/", createEvent) 

eventRouter.put("/:id", updateEvent)
eventRouter.delete("/:id", deleteEvent)
eventRouter.get("/:id", getEvent)

eventRouter.get("/",getAllEvents)

export default eventRouter;