import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    await res.clearCookie('jwt');
    const { name, email, password } = await req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await new  User({ name, email, password: hashedpassword });
    const token = jwt.sign({ id: user._id }, process.env.secretkey, {
      expiresIn: "50s",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    await user.save();
    console.log("New User has been Created", user);
    return res.status(200).json({ message: "New user has been Created", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    await res.clearCookie('jwt');
    const { email, password } = await req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "no user found" });
    }
    const correctpassword = await bcrypt.compare(password, user.password);
    if (!correctpassword) {
      return res.status(401).json({ error: "Wrong Credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.secretkey, {
      expiresIn: "50s",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    console.log(user);
    return res.status(200).json({ message: "Log in Successfull" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
 
export const verifytoken = async(req,res,next)=>{
    try{
        const token = await req?.cookies?.jwt;
    if(token===null){
        return res.status(400).json({error:'Token not Found'});
    }
    const userid = await jwt.verify(token,process.env.secretkey);
    console.log(userid.id);
    req.id = await userid.id;
    next();
    }catch(error){
        return res.status(401).json({ error : 'Token Expired or Invalid'})
    }
} 

export const getUser=async(req,res)=>{
    try{
        
        const id = await req.id;
        if(!id){
            return res.status(500).json({error:'Got No user id'});
        }
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({error:'No User Found'});
        }
        console.log('user after verification ', user);
        return res.status(201).json(user);
    }catch(error){
        return res.status(400).json({error:error.message});
    }                      
}

export const refreshtoken=async(req,res,next)=>{
    try{
        const token = await req?.cookies?.jwt;
    
        if(token===null){
            return res.status(400).json({error:'Token not Found'});
        }
        const userid = await jwt.verify(token,process.env.secretkey,); 
        await res.clearCookie('jwt');
        const newtoken = await jwt.sign({id:userid.id},process.env.secretkey,{
            expiresIn:'28s'
        })
        res.cookie("jwt",newtoken,{
            httpOnly:true,
            secure:true,
            sameSite:'lax'
        })
        console.log('new user token generated',newtoken);
        next();
    }catch(error){
        return res.status(401).json({message:'Invalid token or Expired'});
    }
}

export const logout=async(req,res)=>{
    try{
        const currcookie = await req.cookies?.jwt;
        if(!currcookie){
            return ;
        }
        res.clearCookie('jwt');
        return res.status(201).json({ message : 'Successfully Logged Out'});
    }catch(error){
        return ;
    }
}