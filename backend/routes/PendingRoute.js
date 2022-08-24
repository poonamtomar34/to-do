const express=require('express')
const { findByIdAndUpdate } = require('../model/PendingShema')
const router=new express.Router()
const Post=require('../model/PendingShema')

router.get('/pending', async(req,res)=>{
    try{
        const getPost=await Post.find()
        res.send(getPost)
    }catch(err){
        res.send(err)
    }
})
router.post('/pending', async(req,res)=>{
    try{
        const findTask= await Post.find({taskName:req.body.taskName})
        console.log(" findTask  ",findTask);
        
        if (findTask!=0){
            return res.status(404).json({
                status:"failed",
                message:"Enter new task"
            })
        }
        const saveData = new Post({
            ...req.body,
            description: req.body.description,
            date:req.body.date
          });
          res.json({
            status: "sucess",
            data: await saveData.save(),
          });
    }catch(err){
        res.send(err)
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        
        const result = await Post.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router;