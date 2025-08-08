export const sellerAdmin =  (req, res, next) => {
    if(req.user && req.user.role === "seller") {
        next();
    } else {
        return res.status(403).json({ message: "Access denied - admin Only"});
    }
}