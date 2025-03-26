import express from "express"

const router=express.Router();

router.get("/", (reg, res)=>{
    res.send("endpoint")

})

export default router;