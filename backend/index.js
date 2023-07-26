const express = require("express")
const mongoose = require('mongoose');
const socket = require("socket.io")
const app = express()

mongoose.connect('mongodb+srv://junaiyet:junaiyet90581@cluster0.nhlbevn.mongodb.net/nodePractice?retryWrites=true&w=majority')
  .then(() => console.log('DB Connected!'));


const itemSchema = new mongoose.Schema({
    name:String,
    description:String
})

const Item = mongoose.model("Item",itemSchema)

const server = app.listen(8000,function () {
    console.log("Port Running")
})

const io = require("socket.io")(server,{
    cors:{
        origin:"*"
    }
})

io.on("connection",(socket)=>{
   console.log("New Client Connected")

   socket.emit("connected","Backend Connected to Frontend")

   socket.on("create",(data)=>{
    
     let newItem= new Item({
        name: data.name,
        description:data.description
     })
    newItem.save()

    io.emit("created",newItem)
   });

   socket.on("read",async()=>{
    let all = await Item.find({})
    socket.emit("read",all)
   })

})





//DATABASE_URL = mongodb+srv://junaiyet:junaiyet90581@cluster0.nhlbevn.mongodb.net/nodePractice?retryWrites=true&w=majority
// function dbConnection(){
//     mongoose.connect(process.env.DATABASE_URL)
//     .then(() => console.log('DB Connected'));
// }
