
import { useEffect, useState } from "react"
import io from "socket.io-client"
const socket = io("http://localhost:8000")

function App() {
  let [name,setName]= useState("")
  let [description,setDescription] = useState("")
  let [all,setAll] = useState([])

  useEffect(()=>{

    socket.on("connected",(message)=>{
      console.log(message)
    })

    socket.on("created ",(data)=>{
      console.log(data)
      setAll((prev)=>[...prev,data])
    })
    
    socket.on("read",(all)=>{
      setAll(all)
      console.log(all)
    })

    socket.emit("read")

  },[all])  


 let handleSubmit =()=>{
  console.log(name,description)
  socket.emit("create",{
    name,
    description
  })
 }
  return (
    <>

      <input type="text" onChange={(e)=>setName(e.target.value)} />
      <input type="text" onChange={(e)=>setDescription(e.target.value)} />
     <button onClick={handleSubmit}>Submit</button>
    <ul>
      {all.map(item=>(
        <li key={item._id}>
          {item.name} ----- {item.description}
        </li>
      ))}
    </ul>
    </>
  )
}

export default App
