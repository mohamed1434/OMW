import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import List from "./components/list/List";
import Show from "./components/show/Show";
import UserProfile from "./components/userProfile/UserProfile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Show />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
