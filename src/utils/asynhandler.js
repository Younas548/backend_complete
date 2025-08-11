// async handler utility (sirf ek jagah define karo)
const asynHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch(next);
    };
};

export { asynHandler };



// const asynHandler = () => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             message: error.message
//         })
//     }
// }