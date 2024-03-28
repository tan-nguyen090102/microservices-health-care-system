import "react-router-dom";
import { Route, Routes } from "react-router-dom";
import HomePanel from "./HomeAdmin";

function App() {
  return (
    <Routes>
      <Route path="/admin-home" element={<HomePanel></HomePanel>}></Route>
      <Route></Route>
    </Routes>
  );
}

export default App;
