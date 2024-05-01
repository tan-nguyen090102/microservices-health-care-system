import "react-router-dom";
import { Route, Routes } from "react-router-dom";
import InterfacePanel from "./Interface";

function App() {
  return (
    <Routes>
      <Route path="/search" element={<InterfacePanel></InterfacePanel>}></Route>
    </Routes>
  );
}

export default App;
