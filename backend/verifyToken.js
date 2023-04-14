import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) { return res.status(401).json( "Please Login"); }
    const verified = await jwt.verify(token , process.env.JWT_SECRET);
    if(!verified){
        return res.status(401).json({
            msg : "Please login again"
        });
    }
    req.userId = verified?.id;
    next();
}