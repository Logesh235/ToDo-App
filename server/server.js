const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const taskModel = require('./models/model')


const app = express()
app.use(express.json())
app.use(cors())

app.post("/addTask",(req,res)=>{
    const task = req.body;
    taskModel.create(task).then(res.send("Success")).catch(res.send("fAiled"))
})

app.get("/getTasks", async(req,res)=>{
    try{
        let tasks = await taskModel.find()
        res.status(200).json(tasks)
    }
    catch(e){
        console.log("Server catched error :",e)
        res.send(404).json({message:e.message})
    }
})

app.delete("/deleteTask/:id", async (req,res)=>{
    console.log("ID",req.params.id)
    await taskModel.findByIdAndDelete(req.params.id).then(()=>{
        res.json("Player record ha been deleted.");
    }).catch(e=>{
        res.status(404).json(`Error : ${e}`)
    })
})

mongoose.connect('mongodb+srv://admin:admin@mern.bwds09g.mongodb.net/?retryWrites=true&w=majority&appName=MERN').then(console.log("DB Connected"))
app.listen(3001,()=>{
    console.log("App is Listening at port : 3001")
})

