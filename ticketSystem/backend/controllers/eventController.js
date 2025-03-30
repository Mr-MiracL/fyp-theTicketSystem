import events from "../models/events.js"


export const createEvent= async (req,res, next)=>{
    const newEvent=new events(req.body)
        try{
            const savedEvent= await newEvent.save()
            res.status(200).json(savedEvent)
        }catch(err){
            next(err);

}
}

export const updateEvent= async (req,res, next)=>{
    
        try{
            const updateEvent= await events.findByIdAndUpdate(
                req.params.id,
                {$set:req.body},
                {new:true}

            )
            res.status(200).json(updateEvent)
        }catch(err){
            next(err);

}
}

export const deleteEvent= async (req,res, next)=>{
    
        try{
           await events.findByIdAndDelete(req.params.id)
            res.status(200).json("event has been deleted")
        }catch(err){
            next(err);

}
}

export const getEvent= async (req,res, next)=>{
    
        try{
            const Event1= await events.findById(req.params.id)
            res.status(200).json(Event1)
        }catch(err){
            next(err);

}
}

export const getAllEvents= async (req,res, next)=>{
    try{
        const allEvents=await events.find();
        
        res.status(200).json(allEvents);
    
      }catch(err){
       next(err)
        

}
}
export const getPopularEvents = async (req, res, next) => {
    try {
        
        const popularEvents = await events.find({ isPopular: true })
            .select("name date country ticketPrice availableTickets discount image");

        res.status(200).json(popularEvents);
    } catch (error) {
        console.error("Error fetching popular events:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const countByCountry= async (req,res, next)=>{
    const countries= req.query.countries.sqlit(",")
    try{
       const list = await Promise.all(countries.map(country=>{
        return events.countDocuments({
            country:country
        })
       }))
        
        res.status(200).json(list);
    
      }catch(err){
       next(err)
    
}
}