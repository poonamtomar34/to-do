const express=require('express')
const { findByIdAndUpdate } = require('../model/PendingShema')
const router=new express.Router()
const Post=require('../model/PendingShema')

router.get('/', async(req,res)=>{
    try{
        const getPost=await Post.find()
        res.send(getPost)
    }catch(err){
        res.send(err)
    }
})
router.post('/', async(req,res)=>{
    try{
        const findTask= await Post.find({taskName:req.body.taskName.toLowerCase()})
        console.log(" findTask  ",findTask);
        
        if (findTask[0].taskName){
            return res.status(409).json({
                status:"failed",
                message:"Enter new task"
            })
        }
        const saveData = new Post({
            ...req.body.toLowerCase(),
            description: req.body.description,
            startDate:req.body.startDate,
            status:req.body.status,
            endDate:req.body.endDate
          });
          res.json({
            status: "sucess",
            data: await saveData.save(),
          });
    }catch(err){
        res.send(err)
    }
})

router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Post.deleteOne({ _id: id })
    res.status(200).send();
});
  
module.exports = router;