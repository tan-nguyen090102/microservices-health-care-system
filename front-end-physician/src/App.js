import "react-router-dom";
import { Route, Routes } from "react-router-dom";
import PhysicianPanel from "./PhysicianPanel";
import PatientPanel from "./PatientList";

function App() {
  return (
    <Routes>
      <Route path="/physician-home" element={<PhysicianPanel />}></Route>
      <Route path="/physician-patient" element={<PatientPanel />}></Route>
    </Routes>
  );
}

export default App;
