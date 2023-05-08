import { Router, Routes, Route ,Navigate} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddCenter from "./pages/AddCenter";
import ShowCenter from "./pages/ShowCenter";
import Navbar from "./components/Navbar";

function App() {
    const user = localStorage.getItem("token");

  return (
    <>
      <Router>
        <Navbar>
          <Routes>
    
            <Route path="/login" element={<Login />} />
{user && <Route path="/" element={<HomePage />} />}
            <Route path="/register" element={<Register />} />
            <Route path="/addCenter" element={<AddCenter />} />
            <Route path="/showCenter" element={<ShowCenter />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        </Navbar>
      </Router>
    </>
  );
}

export default App;
