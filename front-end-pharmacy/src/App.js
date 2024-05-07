import "react-router-dom";
import { Route, Routes } from "react-router-dom";
import PharmDashboard from "./PharmDashboard";

function App() {
  return (
    <Routes>
      <Route
        path="/pharmdashboard"
        element={<PharmDashboard></PharmDashboard>}
      ></Route>
    </Routes>
  );
}

export default App;
