import dotenv from 'dotenv';
dotenv.config()
import jwt from 'jsonwebtoken';

export default validateJWT= async (req, res, next) => {
    try{
        const jwtValidate=jwt.verify(req.headers.jwt, process.env.JWT_SECRET);
        if(jwtValidate){
            next();
        }else{
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

    }catch(err){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}