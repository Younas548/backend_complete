const asynHandler = ()=>{
    return(req,res,next) => {
        Promise.resolve(requestHandler(req,res,next))
    }
}

export {asynHandler}


// const asynHandler = () => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             message: error.message
//         })
//     }
// }