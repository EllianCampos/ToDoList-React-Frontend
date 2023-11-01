import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import Main from "./pages/Main"
import Config from "./pages/Config"
import Tarea from "./pages/Tarea"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Index />} />
          <Route path="/main" element = {<Main />} />
          <Route path="/config" element = {<Config />} />
          <Route path="/main/tarea" element = {<Tarea />} />
          <Route path="/main/tarea/:id" element = {<Tarea />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
