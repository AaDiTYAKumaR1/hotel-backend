import  jwt  from "jsonwebtoken";
import { config } from 'dotenv';
config();
export const jwtAuthMidlleware=(req,res,next)=>{
    
    const authorization=req.headers.authorization;
    if(!authorization) return res.status(401).json({error:'Token not found'});
    
    const token=req.headers.authorization.split(' ')[1]
    
        const decode=  jwt.verify(token,process.env.JWT_SECRET);
        // console.log('decode',decode)
        req.userPayload=decode;
        next();
   
}


export const generateToken=(userdata)=>{
    return jwt.sign(userdata,process.env.JWT_SECRET,{expiresIn:3000})
}   