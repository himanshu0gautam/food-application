// const asyncHandler = (fun) => async (req, res, next) => {
//     try {
//        return await fun(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

const asyncHandler = (fun) => async (req, res, next) => {
  Promise.resolve(fun (req, res, next)).catch(next);
};

export { asyncHandler };
