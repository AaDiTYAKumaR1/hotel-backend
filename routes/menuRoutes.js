import  express  from "express";
import MenuItem from "../models/Menu.js";

const router =express.Router();

router.post('/',async(req,res)=>{
    try {
        const data=req.body;
      const menu= new  MenuItem(data);
       let response = await menu.save();
       console.log("menu data saved succesfully",response);
       res.status(200).json({sucess:true,menudata:menu})
    } catch (error) {
        console.log("error occured in storing menu data");
        res.status(500).json({error:error.message });
    }
});
router.get('/',async(req,res)=>{
   try {
     let response= await MenuItem.find();
     console.log("menu data fetched succesfully");
     res.status(200).json(response)
   } catch (error) {
    console.log("error occured in fetching menu data");
    res.status(500).json({error:error.message});
   }

});
// enum:["sweet","spicy","sour"],  
router.get('/:taste',async(req,res)=>{
  try {
      const menuTaste=req.params.taste;
      if(menuTaste=="spicy"|| menuTaste=="sweet"|| menuTaste=="sour")
      {
        const response=await MenuItem.find({taste:menuTaste});
        console.log("response fetched",response);
        res.status(200).json(response);
  
      }else{
        res.status(404).json({error:'invalid taste type'});
      }
  } catch (error) {
    console.log(error);
     res.status(500).json({error:error.message});
  }
})

export default router;
