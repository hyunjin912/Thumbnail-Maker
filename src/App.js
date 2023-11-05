import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Thumbnail from "./routes/Thumbnail";

function App() {
  console.log("App Comp");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="thumb" element={<Thumbnail />} />
    </Routes>
  );
}

export default App;
