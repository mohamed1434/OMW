import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import List from "./components/list/List";
import Show from "./components/show/Show";
import UserProfile from "./components/userProfile/UserProfile";
import AddProperty from "./components/userProfile/AddProperty";
import MyProperties from "./components/userProfile/MyProperties";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Show />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-profile/add-property" element={<AddProperty />} />
        <Route path="/user-profile/my-properties" element={<MyProperties />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
