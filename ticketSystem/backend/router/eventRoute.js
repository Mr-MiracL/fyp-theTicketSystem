import express from "express"
import events from "../models/events";
import { createError } from "../utils/error";

const eventRouter=express.Router();

router.post("/", async(req, res)=> {
    
    const newEvent = new events(req.body)
    try{
        const savedEvent= await newEvent.save()
        res.status(200).json(savedEvent)
    }catch(err){
        res.status(500).json(err)
    }
})
router.put("/:id", async(req, res)=> {
    
    const updateEvent = await events.findByIdAndUpdate(req.params.id,{$set:req.body},
        {new:true}
    )
    res.status(200).json(updateEvent)
            try{
        
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete("/:id", async(req, res)=> {
            try{
             await events.findByIdAndUpdate(req.params.id);
             res.status(200).json("Event has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
router.get("/:id", async(req, res)=> {
  try{
    const event=await events.findById(
        req.params.id
    );
    res.status(200).json(event);

  }catch(err){
    res.status(500).json(err);

  }
})

router.get("/", async(req, res,next)=> {

  try{
    const allEvents=await events.find();
    
    res.status(200).json(allEvents);

  }catch(err){
   next(err)
    
  }
})

export default eventRouter;