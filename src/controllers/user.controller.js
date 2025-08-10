import { asynHandler } from "../utils/asynhandler.js";



const regiterUser = asynHandler( async (requestAnimationFrame,res)=>{
        res.status(200).json({
        messsage: "ok"
    })
})


export { regiterUser}