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
        const allEvents=await events.find(req.query );
        
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

export const countByCategory= async (req,res, next)=>{
    try{
        const SportEvent=await events.countDocuments({type:"sport"})
        const MusicEvent= await events.countDocuments({type:"music"})
        const ConferenceEvent=await events.countDocuments({type:"conference"})
        const TheaterEvent=await events.countDocuments({type:"theater"})
        const OthersEvent =await events.countDocuments({type:"others"})

        res.status(200).json([
            {type: "sport", count: SportEvent},
            {type: "music", count: MusicEvent},
            {type: "conference", count: ConferenceEvent},
            {type: "Therter", count: TheaterEvent},
            {type: "others", count: OthersEvent},

        ]);
    
      }catch(err){
       next(err)
    
}
}
export const getEventDetail = async (req, res) => {
    try {
        const { category, name, date, country } = req.query;
        let filter = {};

        if (category) filter.category = category;
        if (name) filter.name = { $regex: name, $options: "i" }; 
        if (date) filter.date = { $gte: new Date(date) }; 
        if (country) filter.country = country;

        console.log("Filter:", filter);

        const events = await events.find(filter);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};