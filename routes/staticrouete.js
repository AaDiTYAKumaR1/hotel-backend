import express from 'express'

const router= express.Router();

router.get('/signup',(req,res)=>{
    //   res.sendFile(path.join(__dirname,"index.ejs"))
    res.render('index.ejs')
        
    });

router.get('/login', (req,res)=>{
    //   res.sendFile(path.join(__dirname,"index.ejs"))
    res.render('login.ejs')
        
    })

    export default router;