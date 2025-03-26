import express from "express"
import events from "../models/events";

const router=express.Router();

router.post("/", async(req, res)=> {
    
    const newEvent = new events(req.body)
    try{
        
    }catch(err){
        res.status(500).json(err)
    }
})

export default router;