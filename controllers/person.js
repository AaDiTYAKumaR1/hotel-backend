    import Person from '../models/person.js';
    import mongoose from 'mongoose';
    import { jwtAuthMidlleware ,generateToken } from './../jwt.js';
   export async function createPerson(req,res){
        // try {
            const data=req.body;
            const newPerson=Person(data);
                const savedperson =  await newPerson.save();
               
                    const payload={
                        id:savedperson.id,
                        username:savedperson.username
                    }
                console.log(JSON.stringify( payload));
                const token = generateToken(payload);
                console.log("token id :", token);
            return res.status(200).json({response:savedperson,token:token});
        
            // console.log(error);
            // return res.status(500).json({error: 'internal server error'});
        // }
    }
   export async function getAllPerson(req,res){
        try {
            const data= await  Person.find();
            console.log("data fetched ");
           return res.status(200).json(data);
        } catch (error) {
           return console.log(error);
        }
    }




    // export default createPerson getAllPerson 