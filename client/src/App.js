import "./App.css";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParticlesComponent from "./particles/particles";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/" element={<Dashboard />} />
      </Routes>
      <ParticlesComponent id="particles" />
    </Router>
  );
}

export default App;
