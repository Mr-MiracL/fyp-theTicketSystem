import User from "../models/users.js"


export const updateUser= async (req,res, next)=>{
    
        try{
            const updateUser= await User.findByIdAndUpdate(
                req.params.id,
                {$set:req.body},
                {new:true}

            )
            res.status(200).json(updateUser)
        }catch(err){
            next(err);

}
}

export const deleteUser= async (req,res, next)=>{
    
        try{
           await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted")
        }catch(err){
            next(err);

}
}

export const getUser= async (req,res, next)=>{
    
        try{
            const user1= await User.findById(req.params.id)
            res.status(200).json(user1)
        }catch(err){
            next(err);

}
}

export const getAllUsers= async (req,res, next)=>{
    try{
        const allUsers=await User.find();
        
        res.status(200).json(allUsers);
    
      }catch(err){
       next(err)
        

}
}