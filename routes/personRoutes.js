import  express  from "express";
import {createPerson , getAllPerson } from '../controllers/person.js';
import { jwtAuthMidlleware } from "../jwt.js";
import Person from "../models/person.js";
// import { use } from "passport";
import { generateToken } from "../jwt.js";
import { stringify } from "uuid";
const routes=express.Router();
// createperson route
routes.post('/',createPerson);

 routes.get('/',jwtAuthMidlleware, getAllPerson);
 // update api
 routes.post('/login',async(req,res)=>{
  try {
    const {username ,password} =req.body;
    const user =await Person.findOne({username,password})
    if(!user  ) return res.status(401).json({error:'Invalid username or password'});
    // generte token
    const payload={
      id:user.id,
      username:user.username,
    }
     const token = generateToken(payload);
     res.json({token})
  } catch (error) {
    console.log(error);
    res.status(501).json({error:'Internal server error'})
  }
 })
 // get profile
 routes.get('/profile',jwtAuthMidlleware,async(req,res)=>{
  try {
    
    const userPayload =req.userPayload;
    
    const Id =userPayload.id
    
    const user=await Person.findById(Id);
     
    res.json(user)
    
  } catch (error) {
    console.log(error);
    res.status(501).json({error:'Internal server error'})
  }
 })
 // find By Id
 routes.get('/findby/:Id',async(req,res)=>{
 
  try {
    const Id =req.params.Id;
    console.log(Id);
    const response= await Person.findById(Id);
    console.log(response);
    if(!response) res.status(401).json({error:'Invalid Id'})

    res.status(200).json({response})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'Internal server error'})
  }
 })



 routes.put('/Id/:personId', async(req,res)=>{
   try {
     const personId=req.params.personId;
     const personUpdate=req.body;
     const response = await Person.findByIdAndUpdate(personId , personUpdate,{
         new:true,
         runValidators:true
     });
     console.log(response);
     if(!response){ 
         return res.status(404).json({error: 'person not found'})
     }
     console.log("data updated succesfully")
     res.status(200).json(response)
   } catch (error) {
    console.log(error);
    res.status(500).json({error: 'internal server error'});
   }
 });

 // delete api
 routes.delete('/delete/:Id',async(req,res)=>{
  try {
      const personId=req.params.Id;
  
      const response = await Person.findOneAndDelete({_id:personId  });
      if(!response){ 
          return res.status(404).json({error: 'person not found'})
      }
      console.log("data deleted succesfully")
      res.status(200).json(response)
  } catch (error) {
    res.status(500).json({error: 'internal server error'});
  }
 });
 routes.get('/work/:workType',async(req,res)=>{
    try {
      const workType =req.params.workType;
      if(workType=='chef' || workType=='waiter' || workType=='manager')
      {
         const response=await Person.find({work:workType});
         console.log("response fetched");
         res.status(200).json(response)
      }
      else{
          res.status(404).json({error:'invalid work type'});
      }
    } catch (error) {
     console.log(error);
     res.status(500).json({error:'internel server error'});
    }
 });

 export default routes;