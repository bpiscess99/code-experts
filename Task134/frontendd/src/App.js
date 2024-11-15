import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Register from './pages/Register';
import Home from './home/Home';
import axios from "axios"
import Login from './pages/Login';
import Dashboard from './component/Dashboard';

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      </Router> 
    </>
  );
}

export default App;
