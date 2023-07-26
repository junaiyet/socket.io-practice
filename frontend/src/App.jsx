
import { useEffect } from "react"
import io from "socket.io-client"
const socket = io("http://localhost:8000")

function App() {

  useEffect(()=>{
    socket.on("connected",(message)=>{
      console.log(message)
    })
  },[])

  return (
    <>
    <h1>Socket</h1>
    </>
  )
}

export default App
