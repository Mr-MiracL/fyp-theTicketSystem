import express from "express"

import { createEvent, deleteEvent, getAllEvents, getEvent, updateEvent ,countByCountry, getPopularEvents, countByCategory, getEventDetail} from "../controllers/eventController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const eventRouter=express.Router();

eventRouter.post("/",verifyAdmin, createEvent) 

eventRouter.put("/:id",verifyAdmin, updateEvent)
eventRouter.delete("/:id", verifyAdmin, deleteEvent)
eventRouter.get("/find/:id", getEvent)

eventRouter.get("/",getAllEvents)
eventRouter.get("/countByCountry",countByCountry)
eventRouter.get("/countByCategory",getAllEvents)
eventRouter.get("/popular", getPopularEvents)
eventRouter.get("/countByCategory", countByCategory)
eventRouter.get("/details", getEventDetail);

export default eventRouter;