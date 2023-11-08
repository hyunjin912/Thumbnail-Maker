import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Thumbnail from "./routes/Thumbnail";
import NotFound from "./routes/NotFound";

function App() {
  console.log("App Comp");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="thumb" element={<Thumbnail />}>
        <Route path=":thumbId" element={<Thumbnail />} />
      </Route> */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
