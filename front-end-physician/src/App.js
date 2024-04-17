import "react-router-dom";
import { Route, Routes } from "react-router-dom";
import PhysicianPanel from "./PhysicianPanel";

function App() {
  return (
    <Routes>
      <Route path="/physician-home" element={<PhysicianPanel />}></Route>
    </Routes>
  );
}

export default App;
