import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";

function App() {
  console.log("App Comp");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
