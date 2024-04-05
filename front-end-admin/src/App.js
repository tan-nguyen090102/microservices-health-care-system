import "react-router-dom";
import { Route, Routes } from "react-router-dom";
import HomePanel from "./HomeAdmin";
import ManagePanel from "./ManageUser";

function App() {
  return (
    <Routes>
      <Route path="/admin-home" element={<HomePanel></HomePanel>}></Route>
      <Route
        path="/admin-patient"
        element={<ManagePanel></ManagePanel>}
      ></Route>
      <Route
        path="/admin-physician"
        element={<ManagePanel></ManagePanel>}
      ></Route>
      <Route
        path="/admin-pharmacist"
        element={<ManagePanel></ManagePanel>}
      ></Route>
      <Route path="/admin-lab" element={<ManagePanel></ManagePanel>}></Route>
      <Route
        path="/admin-billing"
        element={<ManagePanel></ManagePanel>}
      ></Route>
      <Route path="/admin-admin" element={<ManagePanel></ManagePanel>}></Route>
    </Routes>
  );
}

export default App;
