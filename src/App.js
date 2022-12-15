import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Create from "./components/Create"
import Edit from "./components/Edit"
import Footer from "./components/Footer"
import Inicio from "./components/Inicio"
import Menu from "./components/Menu"
import Show from "./components/Show"

function App() {
  return (
    <div className="App">
<BrowserRouter>
<Menu></Menu>
<Routes>
  <Route path="/" element={<Inicio/>}/>
  <Route path="/show" element={<Show/>}/>
  <Route path="/create" element={<Create/>}/>
  <Route path="/edit/:id" element={<Edit/>}/>
</Routes>
<Footer></Footer>
</BrowserRouter>

    </div>
  );
}

export default App;
