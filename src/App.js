import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddCenter from "./pages/AddCenter";
import ShowCenter from "./pages/ShowCenter";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addCenter" element={<AddCenter />} />
            <Route path="/showCenter" element={<ShowCenter />} />

            <Route path="/" element={<HomePage />} />
          </Routes>
        </Navbar>
      </BrowserRouter>
    </>
  );
}

export default App;
