import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/p_thumbnail-maker" element={<Home />} />
      <Route path="/p_thumbnail-maker/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
