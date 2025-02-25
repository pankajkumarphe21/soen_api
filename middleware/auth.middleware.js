import jwt from 'jsonwebtoken'

export const authUser=async(req,res,next)=>{
    try {
        const token=req.cookies.token||req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).send({error:'Unauthorized User'});
        }
        // const isBlackListed=await redisClient.get(token);
        // if(isBlackListed){
        //     res.cookie('token','');
        //     return res.status(401).send({error:'Unauthorized User'})
        // }   --- redis free trial ended
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        res.status(401).send({error:'Please authenticate'});
    }
}