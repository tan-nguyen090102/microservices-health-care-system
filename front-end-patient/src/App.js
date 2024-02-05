import "react-router-dom";
import { Route, Routes } from "react-router-dom";
import HomePanel from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/patient-home" element={<HomePanel></HomePanel>}></Route>
    </Routes>
  );
}

export default App;
