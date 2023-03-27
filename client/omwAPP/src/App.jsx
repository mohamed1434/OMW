import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import List from "./components/list/List";
import Show from "./components/show/Show";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Show />} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;